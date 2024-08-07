import React, { useEffect, useRef } from 'react';
import { Heading, Tabs } from '@radix-ui/themes'
import { cookies } from 'next/headers'

import { type Database } from '@/lib/database.types'
import { createClient } from '@/utils/supabase/server'


import Graph from './graph';

export const metadata = {
 title: 'Stats',
}

const Page = async () => {
 const cookieStore = cookies()
 const supabase = createClient<Database>(cookieStore)

 const {
   data: { user },
  } = await supabase.auth.getUser()

 if (!user) return null

 const { data: userReal } = await supabase
   .from('user_real')
   .select('*')
   .eq('id', user?.id)
   .single()

  
   const { data: notFinishedData } = await supabase
    .from('status_of_game')
    .select('*')
    .eq('user_id', user?.id)

    if (!notFinishedData) return null




 const { data: statusData } = await supabase
   .from('status_of_game')
   .select('*')
   .eq('status', 'completed')
   .eq('user_id', user?.id)

  if (!statusData) return null

  const { data: puzzleData } = await supabase
   .from('puzzles')
   .select('*')

   if (!puzzleData) return null

 const { data: usersData } = await supabase
   .from('user_real')
   .select('*')
   .eq('id', user?.id)

   if (!usersData) return null

function parseDate(dateString: string): Date {
  const datePart = dateString.split(', ').slice(1).join(', ');

  const date = new Date(datePart);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
      throw new Error('Invalid date format');
  }

  return date;
}





const gameStatsMap: { [key: string]: any } = {};

const completionRate =  ((statusData.length / notFinishedData.length) * 100).toString(); //  gives the user completion rate for puzzles 


statusData.forEach( async (game) => {

  const createdDate = game.created_at ? new Date(game.created_at) : null;
  const endedDate = game.game_ended_at ? new Date(game.game_ended_at) : new Date(game.created_at);


   if (createdDate && endedDate) {
    const differenceInSeconds = Math.floor((endedDate.getTime() - createdDate.getTime()) / 1000)

    const minutes = Math.floor(differenceInSeconds / 60);
    const seconds = differenceInSeconds % 60;

    const formattedTime = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    const puzzle_id = game.metadata
    const puzzle = puzzleData.find((puzzle: any) => puzzle.id === puzzle_id);
     
    if (!gameStatsMap[game.id] || gameStatsMap[game.id].formattedTime.length < formattedTime.length) {
      gameStatsMap[game.id] = {
        gameId: game.id,
        puzzle_name: puzzle?.name,
        formattedTime: formattedTime,
        minutes: minutes,
        seconds: seconds,
        date: parseDate(puzzle?.name || ""),
        checkDate: endedDate
      }; 
    }
  } 
});

interface GameStats {
  gameId: string;
  puzzle_name: string | undefined;
  formattedTime: string;
  minutes: number;
  seconds: number;
  date: Date;
  checkDate: Date;
}

const gameStats = Object.values(gameStatsMap);
gameStats.sort((a, b) => a.date.getTime() - b.date.getTime());

const earliestDateMap = new Map<string, GameStats>();

gameStats.forEach((stat) => {
    const existing = earliestDateMap.get(stat.puzzle_name || "");

    if (!existing || stat.checkDate < existing.checkDate) {
        earliestDateMap.set(stat.puzzle_name || "", stat);
    }
});

// Convert the map back to an array
const uniqueGameStats = Array.from(earliestDateMap.values());



interface GameObject {
  formattedTime: string;
  date: Date
  minutes: BigInteger
  seconds: BigInteger
  checkDate: Date
  
}



  function timeStringToSeconds(timeString: string): number {
    const [minutes, seconds] = timeString.split(":").map(Number);
    return minutes * 60 + seconds;
  }

function calculateAverageTime(gameStats: GameObject[]): string {
  const totalSeconds = gameStats.reduce((acc, game) => acc + timeStringToSeconds(game.formattedTime), 0);
  const averageSeconds = totalSeconds / gameStats.length;
  
  const minutes = Math.floor(averageSeconds / 60);
  const roundedSeconds = Math.round(averageSeconds % 60);
  
  if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      
      if (hours >= 24) {
          const days = Math.floor(hours / 24);
          const remainingHours = hours % 24;
          
          return `${days} days, ${remainingHours} hours, ${remainingMinutes} minutes, ${roundedSeconds} seconds`;
      } else {
          return `${hours} hours, ${remainingMinutes} minutes, ${roundedSeconds} seconds`;
      }
  } else {
      return `${minutes} minutes, ${roundedSeconds} seconds`;
  }
}

const oneWeekAgo = new Date();
oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

const thirtyDaysAgo = new Date();
thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

const pastWeekGameStats = gameStats.filter(game => game.date >= oneWeekAgo);

const weeklyGamesCompleted = pastWeekGameStats.length

pastWeekGameStats.sort((a, b) => a.date.getTime() - b.date.getTime());

  let weeklongestStreak = 1;
  let weekcurrentStreak = 1;
  let weekpreviousDate = pastWeekGameStats[0].date;

  for (let i = 1; i < pastWeekGameStats.length; i++) {
    const currentDate = pastWeekGameStats[i].date;
    const differenceInDays = (currentDate.getTime() - weekpreviousDate.getTime()) / (1000 * 60 * 60 * 24);

    if (differenceInDays === 1) {
      weekcurrentStreak += 1;
    } else if (differenceInDays > 1) {
      weeklongestStreak = 1;
    }

    weeklongestStreak = Math.max(weeklongestStreak, weekcurrentStreak);
    weekpreviousDate = currentDate;
  }





const pastThirtyDaysGameStats = gameStats.filter(game => game.date >= thirtyDaysAgo);

const monthlyGamesCompleted = pastThirtyDaysGameStats.length

const allGamesCompleted = gameStats.length


pastThirtyDaysGameStats.sort((a, b) => a.date.getTime() - b.date.getTime());

  let ThirtylongestStreak = 1;
  let ThirtycurrentStreak = 1;
  let ThirtypreviousDate = pastThirtyDaysGameStats[0].date;

  for (let i = 1; i < pastThirtyDaysGameStats.length; i++) {
    const currentDate = pastThirtyDaysGameStats[i].date;
    const differenceInDays = (currentDate.getTime() - ThirtypreviousDate.getTime()) / (1000 * 60 * 60 * 24);

    if (differenceInDays === 1) {
      ThirtycurrentStreak += 1;
    } else if (differenceInDays > 1) {
      ThirtylongestStreak = 1;
    }

    ThirtylongestStreak = Math.max(ThirtylongestStreak, ThirtycurrentStreak);
    ThirtypreviousDate = currentDate;
  }







function calculateStatistics(gameStats: GameObject[]): { fastest: string, slowest: string, average: string, median: string } {
  const sortedTimesInSeconds = gameStats.map(game => timeStringToSeconds(game.formattedTime)).sort((a, b) => a - b);

  const fastestSeconds = sortedTimesInSeconds[0];
  const slowestSeconds = sortedTimesInSeconds[sortedTimesInSeconds.length - 1];
  const medianSeconds = sortedTimesInSeconds[Math.floor(sortedTimesInSeconds.length / 2)];

  const fastest = formatTime(fastestSeconds);
  const slowest = formatTime(slowestSeconds);
  const average = calculateAverageTime(gameStats);
  const median = formatTime(medianSeconds);

  return { fastest, slowest, average, median };
}



const pastWeekStatistics = calculateStatistics(pastWeekGameStats);


gameStats.sort((a, b) => a.date.getTime() - b.date.getTime());

  let longestStreak = 1;
  let currentStreak = 1;
  let previousDate = gameStats[0].date;

  for (let i = 1; i < gameStats.length; i++) {
    const currentDate = gameStats[i].date;
    const differenceInDays = (currentDate.getTime() - previousDate.getTime()) / (1000 * 60 * 60 * 24);

    if (differenceInDays === 1) {
      currentStreak += 1;
    } else if (differenceInDays > 1) {
      currentStreak = 1;
    }

    longestStreak = Math.max(longestStreak, currentStreak);
    previousDate = currentDate;
  }

console.log(longestStreak)







function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const roundedSeconds = Math.round(seconds % 60);
  
  if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      
      if (hours >= 24) {
          const days = Math.floor(hours / 24);
          const remainingHours = hours % 24;
          
          return `${days} days, ${remainingHours} hours, ${remainingMinutes} minutes, ${roundedSeconds} seconds`;
      } else {
          return `${hours} hours, ${remainingMinutes} minutes, ${roundedSeconds} seconds`;
      }
  } else {
      return `${minutes} minutes, ${roundedSeconds} seconds`;
  }
}

const statistics = calculateStatistics(gameStats);



  const weeklyCompletedGames = statusData.filter(game => new Date(game.created_at) >= oneWeekAgo);
  const monthlyCompletedGames = statusData.filter(game => new Date(game.created_at) >= thirtyDaysAgo);

  const weeklyGames = notFinishedData.filter(game => new Date(game.created_at) >= oneWeekAgo);
  const monthlyGames = notFinishedData.filter(game => new Date(game.created_at) >= thirtyDaysAgo);

  const weeklyCompletionRate =  ((weeklyCompletedGames.length / weeklyGames.length) * 100).toString(); 
  const monthlyCompletionRate =  ((monthlyCompletedGames.length / monthlyGames.length) * 100).toString(); 




  





console.log(longestStreak)







const pastThirtyDaysStatistics = calculateStatistics(pastThirtyDaysGameStats);
const isGuestUser = userReal.raw_user_meta_data.name.startsWith("Guest User");

 return (
  
  <div className="flex flex-col h-full py-5">
  {isGuestUser ? (
    <div className="flex px-5 pb-2">
     <b>Guest Users do not have access to the stats page. Log out and create an account to start viewing your stats!</b> 
    </div>
  ) : (
    <>
      <Heading className="flex px-5 pb-2">Stats for {userReal.raw_user_meta_data.name}</Heading>
      <div className="flex px-5 pb-2">
     <i>Stats were reset on Jun 9, 2024 due to a much-needed overhaul to the way game info was stored. The stats page is currently under active development.</i> 
    </div>
      <div>
        <Graph 
          gameStats={uniqueGameStats}
          mean={{
            monthly: pastThirtyDaysStatistics.average,
            weekly: pastWeekStatistics.average,
            alltime: statistics.average
          }}
          median={{
            monthly: pastThirtyDaysStatistics.median,
            weekly: pastWeekStatistics.median,
            alltime: statistics.median
          }}
          fastest={{
            monthly: pastThirtyDaysStatistics.fastest,
            weekly: pastWeekStatistics.fastest,
            alltime: statistics.fastest
          }}
          slowest={{
            monthly: pastThirtyDaysStatistics.slowest,
            weekly: pastWeekStatistics.slowest,
            alltime: statistics.slowest
          }}
          completion = {{
            monthly: monthlyCompletionRate,
            weekly: weeklyCompletionRate,
            alltime: completionRate
          }}
          streak = {{
            monthly: ThirtylongestStreak.toString(),
            weekly: weeklongestStreak.toString(),
            alltime: longestStreak.toString(), 
          }}
          finished = {{
            monthly: monthlyCompletedGames.length.toString(),
            weekly: weeklyCompletedGames.length.toString(),
            alltime: allGamesCompleted.toString()
          }}
        /> 
      </div>
    </>
  )}
</div>
);
};


export default Page
export const dynamic = 'force-dynamic'
export const revalidate = 0




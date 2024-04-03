import React, { useEffect, useRef } from 'react';
import { Heading, Tabs } from '@radix-ui/themes'
import { cookies } from 'next/headers'

import { subDays, formatISO } from 'date-fns';



import { type Database } from '@/lib/database.types'
import { createClient } from '@/utils/supabase/server'


import Chart from 'chart.js/auto';

import Graph from './graph';


import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import classNames from 'classnames';






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



 const { data: gamesData } = await supabase
   .from('games')
   .select('*')
   .eq('created_by', user?.id)


   if (!gamesData) return null


   const fiveDaysAgo = subDays(new Date(), 7);

   // Format the date in ISO8601 format
   const fiveDaysAgoISO = formatISO(fiveDaysAgo);



 const { data: statusData } = await supabase
   .from('status_of_game')
   .select('*')
   .eq('status', 'completed')
   .gt('game_ended_at', fiveDaysAgoISO);




  if (!statusData) return null



 const { data: usersData } = await supabase
   .from('user_real')
   .select('*')
   .eq('id', user?.id)



   if (!usersData) return null



const gameStatsMap: { [key: string]: any } = {};


gamesData.forEach((game) => {
 const matchedThing = statusData.find(thing => thing.id === game.id);
 if (matchedThing) {

  const createdDate = new Date(game.created_at);
   const endedDate = matchedThing.game_ended_at ? new Date(matchedThing.game_ended_at) : null;


   if (endedDate) {
     const differenceInSeconds = Math.floor((endedDate.getTime() - createdDate.getTime()) / 1000)

     const minutes = Math.floor(differenceInSeconds / 60);
     const seconds = differenceInSeconds % 60;

     const formattedTime = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

     const user = usersData.find(user => user.id === game.created_by);
     const userEmail = user ? user.email : 'Unknown';
     const userName = user ? user.raw_user_meta_data : 'Unknown';

     if (!gameStatsMap[game.id] || gameStatsMap[game.id].formattedTime.length < formattedTime.length) {
       gameStatsMap[game.id] = {
         gameId: game.id,
         userEmail: userEmail,
         userName: userName,
         formattedTime: formattedTime,
         minutes: minutes,
         seconds: seconds,
         date: endedDate

       };
     }
   }
 }
});




const gameStats = Object.values(gameStatsMap);





interface GameObject {
  formattedTime: string;
  date: Date
  minutes: BigInteger
  seconds: BigInteger
  
}

  function timeStringToSeconds(timeString: string): number {
    const [minutes, seconds] = timeString.split(":").map(Number);
    return minutes * 60 + seconds;
  }

  function secondsToTimeString(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
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

const oneWeekAgo = new Date();
oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

const pastWeekGameStats = gameStats.filter(game => game.date >= oneWeekAgo);
const pastWeekStatistics = calculateStatistics(pastWeekGameStats);


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

const thirtyDaysAgo = new Date();
thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

const pastThirtyDaysGameStats = gameStats.filter(game => game.date >= thirtyDaysAgo);
const pastThirtyDaysStatistics = calculateStatistics(pastThirtyDaysGameStats);






 return (
   <div className="flex flex-col h-full py-5">
     <Heading className="flex px-5 pb-2">Stats for {userReal.raw_user_meta_data.name}</Heading>

     <Graph 
       gameStats={gameStats}
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
/>      



</div>
    
  

  
 )
}


export default Page
export const dynamic = 'force-dynamic'
export const revalidate = 0




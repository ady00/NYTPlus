import React from 'react'
import { Heading } from '@radix-ui/themes'
import { cookies } from 'next/headers'


import { type Database } from '@/lib/database.types'
import { createClient } from '@/utils/supabase/server'






export const metadata = {
 title: 'Puzzles',
}


const Page = async () => {
 const cookieStore = cookies()
 const supabase = createClient<Database>(cookieStore)


 const {
   data: { user },
 } = await supabase.auth.getUser()






 if (!user) return null


 const { data } = await supabase
   .from('puzzles')
   .select('*')
   .order('created_at', { ascending: false })
   .limit(1);




 if (!data) return null


 const mostRecentPuzzle = data[0];
 const puzzleId = mostRecentPuzzle.id;




























 const { data: gamesData } = await supabase
   .from('games')
   .select('*')
   .eq('puzzle_id', puzzleId);


   if (!gamesData) return null





 const { data: status_of_gameData } = await supabase
   .from('status_of_game')
   .select('*')
   .eq('status', 'completed')




  if (!status_of_gameData) return null



 const { data: usersData } = await supabase
   .from('user_real')
   .select('*')


   if (!usersData) return null


   const gameStatsMap: { [key: string]: any } = {};


gamesData.forEach((game) => {
 const matchedThing = status_of_gameData.find(thing => thing.id === game.id);
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
         seconds: seconds

       };
     }
   }
 }
});




const gameStats = Object.values(gameStatsMap);

gameStats.sort((a, b) => {
  const [minutesA, secondsA] = a.formattedTime.split(':').map(Number);
  const [minutesB, secondsB] = b.formattedTime.split(':').map(Number);

  if (minutesA !== minutesB) {
    return minutesA - minutesB;
  }

  return secondsA - secondsB;
});


interface GameStat {
  gameId: string;
  userEmail: string;
  userName: { name: string }; // kinda weird
  formattedTime: string;
  minutes: string;
  seconds: string
}

const userStatsMap: { [userName: string]: GameStat } = {};

function getSuffix(number: number) {
  const suffixes = ["th", "st", "nd", "rd"];
  const remainder10 = number % 10;
  const remainder100 = number % 100;
  if (remainder100 === 11 || remainder100 === 12 || remainder100 === 13) {
    return suffixes[0];
  } else {
    return suffixes[remainder10] || suffixes[0];
  }
}




gameStats.forEach(gameStat => {
  const { userName, formattedTime } = gameStat;

  const userKey = userName.name;
  
  if (userKey in userStatsMap) {
    const existingGameStat = userStatsMap[userKey];
    
    const [existingMinutes, existingSeconds] = existingGameStat.formattedTime.split(':').map(Number);
    const [newMinutes, newSeconds] = formattedTime.split(':').map(Number);
    
    if (newMinutes > existingMinutes || (newMinutes === existingMinutes && newSeconds > existingSeconds)) {
      userStatsMap[userKey] = gameStat;
    }
  } else {
    userStatsMap[userKey] = gameStat;
  }
});

const uniqueGameStats = Object.values(userStatsMap);


const filteredGameStats = uniqueGameStats.filter(gameStat => {
  const [minutes, seconds] = gameStat.formattedTime.split(':').map(Number);
  const totalTimeInSeconds = minutes * 60 + seconds;
  return totalTimeInSeconds >= 10;
});

filteredGameStats.sort((a, b) => {
  const [minutesA, secondsA] = a.formattedTime.split(':').map(Number);
  const [minutesB, secondsB] = b.formattedTime.split(':').map(Number);

  const totalTimeInSecondsA = minutesA * 60 + secondsA;
  const totalTimeInSecondsB = minutesB * 60 + secondsB;

  // compare  times
  return totalTimeInSecondsA - totalTimeInSecondsB;
});

if (!filteredGameStats) return null






   
  




 return (
   <div className="flex flex-col h-full py-5">
     <Heading className="flex px-5">Daily Leaderboard for {mostRecentPuzzle.name}</Heading>
    


     <ol className="px-2 py-2 my-2" style={{ fontSize: '1.1em' }}>
      {filteredGameStats.map((game, index) => (
        <li key={game?.gameId} style={{ fontSize: '1.2em' }}>
          {index === 0 && '🥇'}
          {index === 1 && '🥈'}
          {index === 2 && '🥉'}
          <i>{index > 2 && `${index + 1}${getSuffix(index + 1)}. `}</i>
          <b>{game?.userName.name}</b> — {game?.minutes}m, {game?.seconds}s
        </li>
      ))}
    </ol>
   </div>
 )
}


export default Page
export const dynamic = 'force-dynamic'
export const revalidate = 0




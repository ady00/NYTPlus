import React from 'react'
import { Heading } from '@radix-ui/themes'
import { cookies } from 'next/headers'


import { type Database } from '@/lib/database.types'
import { createClient } from '@/utils/supabase/server'
import { subDays, formatISO } from 'date-fns';







export const metadata = {
 title: 'Leaderboard',
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

 const dayAgo = subDays(new Date(), 1);

   // Format the date in ISO8601 format
   const DaysAgoISO = formatISO(dayAgo);



 const { data: gamesData } = await supabase
   .from('games')
   .select('*')
   .eq('puzzle_id', puzzleId)
   .gt('created_at', DaysAgoISO);





   if (!gamesData) return null

   gamesData.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

   // Create a Set to track unique user IDs
   const uniqueUserIds = new Set<string>(); // Assuming created_by is of type string
   const filteredGamesData: { created_at: string; created_by: string }[] = []; // Explicitly type filteredGamesData

   gamesData.forEach((game: { created_at: string; created_by: string }) => {
       if (!uniqueUserIds.has(game.created_by)) {
           uniqueUserIds.add(game.created_by);
           filteredGamesData.push(game);
       }
   });

   // Log the user IDs from the filtered games data
   let counter = 1;
   filteredGamesData.forEach(game => {
      console.log(counter++);
       console.log(game.created_by);
   });

   
   const userIds = gamesData.map(game => game.created_by);









   
   


 const { data: statusData } = await supabase
   .from('status_of_game')
   .select('*')
   .eq('status', 'completed')
   .eq('metadata', puzzleId)

   .gt('game_ended_at', DaysAgoISO);

  if (!statusData) return null


  statusData.forEach(status => {
    console.log(`Game ID: ${status.id}, Status: ${status.status}, Ended At: ${status.game_ended_at}`);
});





 


 const { data: usersData } = await supabase
   .from('user_real')
   .select('*')
   .not('email', 'like', '%@guest.com');


   if (!usersData) return null

   const filteredUsersData = usersData.filter(user => userIds.includes(user.id));
   const userIdsFromFilteredUsers = filteredUsersData.map(user => user.id);



  // Create an array that contains the IDs of the filtered users



const gameStatsMap: { [key: string]: any } = {};

// here we go!

interface StatusData {
  game_ended_at: string | null;
  id: string;
  status: "ongoing" | "completed" | "abandoned";
  user_id: string;
}

async function findStatusObject(statusData: StatusData[], gameId: string): Promise<StatusData | null> {
  if (!statusData || statusData.length === 0 || !gameId) {
      return null;

  }
  const statusObject = statusData.find(status => status.id === gameId);
  return statusObject || null;
}


gamesData.forEach( async (game) => {
 const matchedStatus = statusData.find(status => status.id === game.id);
  
 
 if (matchedStatus) {

  const createdDate = new Date(game.created_at);
   const endedDate = matchedStatus.game_ended_at ? new Date(matchedStatus.game_ended_at) : null;


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

gameStats.filter(stats => stats.userName?.name && !stats.userName?.name?.startsWith("Guest User"));

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
  
  const isNotGuestUser = !gameStat.userName?.name?.startsWith("Guest User");

  return totalTimeInSeconds >= 10 && isNotGuestUser;
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
     {filteredGameStats.map((game, index) => {
    // Trim the user's name to first name and first initial of last name
    const fullName = game?.userName.name;
    let trimmedName = "";

    if (fullName) {
      const names = fullName.split(" ");
      if (names.length >= 2) {
        trimmedName = names[0] + " " + names[names.length - 1].charAt(0) + ".";
      } else {
        trimmedName = fullName;
      }
    }

    return (
      <li key={game?.gameId} style={{ fontSize: '1.2em' }}>
        {index === 0 && '🥇'}
        {index === 1 && '🥈'}
        {index === 2 && '🥉'}
        <i>{index > 2 && `${index + 1}${getSuffix(index + 1)}. `}</i>
        <b>{trimmedName.trim() !== '' ? trimmedName : 'RobCrossword'}</b> — {game?.minutes}m, {game?.seconds}s
      </li>
    );
  })}
    </ol>
   </div>
 )
}


export default Page
export const dynamic = 'force-dynamic'
export const revalidate = 0




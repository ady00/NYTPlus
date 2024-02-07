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


 const mostRecentGame = gamesData[0];
 const gameId = mostRecentGame.id;






 const { data: status_of_gameData } = await supabase
   .from('status_of_game')
   .select('*')
   .eq('status', 'completed')




  if (!status_of_gameData) return null




 const { data: usersData } = await supabase
   .from('user_real')
   .select('*')




   if (!usersData) return null




   // THING
   // BLOCK
   // STOP
   // DONT LOOK










    // Construct an object to store gameStats information indexed by gameId
   const gameStatsMap: { [key: string]: any } = {};


// Populate gameStatsMap with gameStats information
gamesData.forEach((game) => {
 const matchedThing = status_of_gameData.find(thing => thing.id === game.id);
 if (matchedThing) {
   // Parse the dates
   const createdDate = new Date(game.created_at);
   const endedDate = matchedThing.game_ended_at ? new Date(matchedThing.game_ended_at) : null;


   if (endedDate) {
     // Calculate the difference in milliseconds
     const differenceInSeconds = Math.floor((endedDate.getTime() - createdDate.getTime()) / 1000);


     // Convert seconds to minutes and seconds
     const minutes = Math.floor(differenceInSeconds / 60);
     const seconds = differenceInSeconds % 60;


     // Construct the formatted string for time
     const formattedTime = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;


     // Find the user object corresponding to the creator
     const user = usersData.find(user => user.id === game.created_by);


     // Extract user email if user is found
     const userEmail = user ? user.email : 'Unknown';


     const userName = user ? user.raw_user_meta_data : 'Unknown';




     // Check if the gameId already exists in gameStatsMap
     if (!gameStatsMap[game.id] || gameStatsMap[game.id].formattedTime.length < formattedTime.length) {
       gameStatsMap[game.id] = {
         gameId: game.id,
         userEmail: userEmail,
         userName: userName,
         formattedTime: formattedTime
       };
     }
   }
 }
});


// Convert gameStatsMap object into an array of gameStats values


const gameStats = Object.values(gameStatsMap);


// Convert gameStats array into a set to remove duplicate gameIds
const uniqueGameStatsSet = new Set(gameStats.map(game => game.gameId));


// Filter gameStats array to include only unique gameStats objects
const uniqueGameStats = gameStats.filter(game => uniqueGameStatsSet.has(game.gameId));
   
  




 return (
   <div className="flex flex-col h-full py-5">
     <Heading className="flex px-5">Daily Leaderboard for {mostRecentPuzzle.name}</Heading>
    
    
    


 <ol>
   {uniqueGameStats.map((game) => (
     <li key={game?.gameId}>
       {game?.userName.name}: ({game?.formattedTime}) minutes
     </li>
   ))}
 </ol>
   </div>
 )
}


export default Page
export const dynamic = 'force-dynamic'
export const revalidate = 0




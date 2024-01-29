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
    .eq('id', gameId)
    .eq('status', 'completed')

    const { data: usersData } = await supabase
      .from('users')
      .select('*')

  
  if (!status_of_gameData) return null

  const gameIDlist = status_of_gameData.map(item => item.id);


  
  




  


  


  
    
    


  return (
    <div className="flex flex-col h-full py-5">
      <Heading className="flex px-5">Daily Leaderboard for {mostRecentPuzzle.name}</Heading>
      
      <ul>
        {gamesData.map((game) => (
          <li key={game.id}>{game.created_by}</li>
        ))}
      </ul>
      <ul>
        <br></br>
        {gameIDlist.map((game) => (
          <li key={game}>{game}</li>
        ))}
      </ul>
      
    </div>
  )
}

export default Page
export const dynamic = 'force-dynamic'
export const revalidate = 0

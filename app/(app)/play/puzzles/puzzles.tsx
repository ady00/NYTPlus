'use client'
import React, { useMemo, useState, useCallback, useEffect } from 'react'
import { CookieIcon, Cross1Icon, FilePlusIcon } from '@radix-ui/react-icons'
import { Table, Text } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'


import { type Database } from '@/lib/database.types'


import { type Session } from '@supabase/supabase-js'


import { createClient } from '@/utils/supabase/client'



type Props = {
 puzzles: Array<Database['public']['Tables']['puzzles']['Row']>
 session: Session
}


const Puzzles: React.FC<Props> = ({ session, puzzles }) => {
 const [profile, setProfile] = useState<Database['public']['Tables']['profiles']['Row']>()
 const [games, setGames] = useState<Database['public']['Tables']['status_of_game']['Row'][]>([]);


 const router = useRouter()


 const user = session?.user
 const supabase = createClient<Database>()


 const getProfile = useCallback(async () => {

   const { data, error } = await supabase
     .from('user_real')
     .select('*')
     .eq('id', user?.id)
     .single()
  
    


   if (!data) return
   setProfile(data as any)
 }, [supabase, user?.id])


 useEffect(() => {
   void getProfile()
 }, [getProfile])




 const getGames = useCallback(async () => {


   const { data, error } = await supabase
     .from('status_of_game')
     .select('*')
     .eq('user_id', user?.id)
     .eq('status', 'completed')
  
    
   if (!data) return
   setProfile(data as any)


  
  


 }, [supabase, user?.id])


 useEffect(() => {
   void getGames()
 }, [getGames])






 const sortedPuzzles = useMemo(() => {
   return [...puzzles].sort((a, b) => {
     return b.created_at.localeCompare(a.created_at)
   })
 }, [puzzles])


 return (
   <div className="min-w-[10rem]">
     <hr className="relative mt-2 border-dashed border-gray-5" />


    
    
     <Table.Root
       className={`w-full ${puzzles.length > 0 && 'h-full'}`}
       size="3"
     >
       <Table.Header>
         <Table.Row>
           <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
           <Table.ColumnHeaderCell>Size</Table.ColumnHeaderCell>
           <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
         </Table.Row>
       </Table.Header>
       <Table.Body>
         {sortedPuzzles?.map((puzzle) => {
           const puzzleUrl = `/play/puzzles/${puzzle.id}`
           const isMatchingGame = games.some(game => game.metadata === puzzle.id);
           const puzzleName = isMatchingGame ? <i>{`${puzzle.name} (puzzle completed)`}isMatchingGame</i> : <p>{puzzle.name}</p>;


           return (
             <Table.Row
               role="link"
               onMouseOver={() => {
                 router.prefetch(puzzleUrl);
               }}
               onClick={() => {
                 router.push(puzzleUrl);
               }}
               className="cursor-pointer hover:bg-gray-100"
               key={puzzle.id}
             >
               <Table.RowHeaderCell>
                 <span className="truncate">{puzzleName}</span>
               </Table.RowHeaderCell>
               <Table.Cell className="flex items-baseline">
                 {puzzle.rows} <Cross1Icon height={10} /> {puzzle.cols}
               </Table.Cell>
               <Table.Cell>
                 {new Date(puzzle.created_at).toLocaleDateString()}
               </Table.Cell>
             </Table.Row>
           );
         })}
       </Table.Body>
     </Table.Root>


     {puzzles.length === 0 && (
       <div className="flex flex-col items-center justify-center flex-1 w-full gap-2 p-4 py-8">
         <CookieIcon width={42} height={42} />
         <Text className="text-gray-900">No puzzles yet!</Text>
       </div>
     )}
   </div>
 )
}


export default Puzzles




import React from 'react'
import { Heading } from '@radix-ui/themes'
import { cookies, headers } from 'next/headers'


import { type Database } from '@/lib/database.types'
import { createClient } from '@/utils/supabase/server'


import Puzzles from './puzzles'


import { redirect } from 'next/navigation'


export const metadata = {
 title: 'Puzzles',
}


const Page = async () => {
 const cookieStore = cookies()
 const supabase = createClient<Database>(cookieStore)


 const {
   data: { session },
 } = await supabase.auth.getSession()
 const pathname = headers().get('x-pathname')


 const user = session?.user
 if (!user) return redirect(`/login${`?redirectTo=${pathname}`}`)


 // separate
 const { data } = await supabase
   .from('puzzles')
   .select('*')
   .is('year', null);


 if (!data) return null


 return (
   <div className="flex flex-col h-full py-5">
     <Heading className="flex px-5">Puzzles</Heading>
     <Puzzles session = {session} puzzles={data} />
   </div>
 )
}


export default Page
export const dynamic = 'force-dynamic'
export const revalidate = 0


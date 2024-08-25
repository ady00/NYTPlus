'use client'

import { Button, TextField } from '@radix-ui/themes'
import { redirect } from 'next/navigation'

import { type Database } from '@/lib/database.types'
import { createClient } from '@/utils/supabase/client'

const Form = () => {
  const signIn = async (formData: FormData) => {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = createClient<Database>()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
  
      return redirect('/login?message=Could not authenticate user')

    }

    return redirect('/play')
  }

  function generateRandomCode() {
    return Math.floor(1000 + Math.random() * 9000);
  }

  const guestRegister = async () => {

    const names = ["Deckard", "Neo", "Dalton", "Landa", "Hellstrom", "Hicox", "Hayes", "Fillmore", "Zane", "Suleiman", "Phillipa", "Monroe", "Van Buren", "Sumner", "Ringo", "Pleasonton", "Pleasonton","Pleasonton"];

    const supabase = createClient<Database>()

    const email = `guest${generateRandomCode()}@guest.com`;
    const password = `password${generateRandomCode()}`;
    const name = "Guest User " + names[Math.floor(Math.random() * names.length)];

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
        },
      },
    })
    if (error) {
  
      return redirect('/login?message=Could not activate guest mode')

    }

    return redirect('/play')
  }

  const signUp = async (formData: FormData) => {
    const email = formData.get('signupEmail') as string
    const password = formData.get('signupPassword') as string
    const name = formData.get('signupName') as string

    const supabase = createClient<Database>()

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
        },
      },
    })

    if (error) {
      return redirect('/login?message=Invalid email/password used!')
    }

    return redirect('/play')
  }

  return (
      <div className="mt-2">
        
          


        <details className="mt-2" >
        <summary className="opacity-80">Log In with Email</summary>

        <form action={signIn}>
          <div className="flex flex-col gap-1 py-2">
          
            <label className="text-md" htmlFor="email">
              Email
            </label>
            <TextField.Input
              name="email"
              placeholder="you@example.com"
              required
            />
            <label className="text-md" htmlFor="password">
              Password
            </label>
            <TextField.Input
              type="password"
              name="password"
              placeholder="••••••••"
              required
            />

            <div className="flex flex-col w-full mt-4">
              <Button>Log In</Button>
            </div>
          </div>
        </form>

      </details>
        
        <div className = "mt-2">

        <details className="mt-2" >
        <summary className="opacity-80">Sign Up with Email</summary>

        <form action={signUp} className = "py-2">

<div className="flex flex-col gap-1">
  <label className="text-md" htmlFor="signupEmail">
    Email
  </label>
  <TextField.Input
    name="signupEmail"
    placeholder="you@example.com"
    required
  />
  <label className="text-md" htmlFor="signupPassword">
    Password
  </label>
  <TextField.Input
    type="password"
    name="signupPassword"
    placeholder="••••••••"
    required
  />
  <label className="text-md" htmlFor="signupName">
    Username
  </label>
  <TextField.Input
    name="signupName"
    placeholder="Rob Crossword"
    required
  />
  <div className="flex flex-col w-full mt-4">
    <Button>Sign Up</Button>
  </div>
</div>
</form>
             
        </details>

        <hr className="border-t-2 border-dashed border-gray-300 mt-6"/>

        </div>
          {/*<div className="flex justify-center p-2">
            <form className="px-10 mx-4" action = {guestRegister}><Button className = "px-4">Play as Guest</Button></form>
          </div>*/}
            <span className="text-gray-900 text-sm"><i>Guests cannot be on daily leaderboards or view stats.</i></span>


      </div>
      
  )
}

export default Form

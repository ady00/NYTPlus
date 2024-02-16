'use client'

import { Button, TextField } from '@radix-ui/themes'
import { redirect } from 'next/navigation'

import { type Database } from '@/lib/database.types'
import { createClient } from '@/utils/supabase/client'

const Form = () => {
  const signUp = async (formData: FormData) => {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = createClient<Database>()

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })
    

    return redirect('/play')
  }
  return (
    process.env.NODE_ENV === 'development' && (
      <details className="mt-2">
        <summary className="text-xs opacity-50">Sign up</summary>
        <form action={signUp}>
          <div className="flex flex-col gap-1 mt-4">
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
            <label className="text-md" htmlFor="name">
              Username
            </label>
            <TextField.Input
              name="Name"
              placeholder="Rob Crossword"
              required
            />
            <div className="flex flex-col w-full mt-4">
              <Button>Sign in</Button>
            </div>
          </div>
        </form>
      </details>
    )
  )
}

export default Form

import { useEffect, useState } from 'react'

import { type Database } from '@/lib/database.types'

import { type Session } from '@supabase/supabase-js'


const useConclusion = (
  gameId: string,
  gameStatus?: Database['public']['Tables']['status_of_game']['Row']['status'],
) => {
  const [isExploding, setIsExploding] = useState(false)
  const [claimedToBeComplete, setClaimedToBeComplete] = useState(false)

  const user = ({ session }: { session: Session }) => {
    const user = session?.user

  }

  




  useEffect(() => {
    if (gameStatus === 'completed') {
      setClaimedToBeComplete(true)
      setIsExploding(true)
    }

    const timeout = setTimeout(() => {
      setIsExploding(false)
    }, 200)

    return () => {
      clearTimeout(timeout)
    }
  }, [gameStatus])

  const claimComplete = () => {
    setClaimedToBeComplete(true)

    fetch('/api/games/claim-complete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gameId),
    })
      .then(async (response) => await response.json())
      .then(({ error }) => {
        if (error) {
          console.error(error)
          setClaimedToBeComplete(false)
        }
      })
      .catch((error) => {
        setClaimedToBeComplete(false)
        console.error('Error:', error)
      })
  }

  return { claimComplete, claimedToBeComplete, isExploding }
}

export default useConclusion

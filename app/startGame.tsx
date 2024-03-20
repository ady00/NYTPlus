'use client'
import React, { useState } from 'react'
import { Button } from '@radix-ui/themes'
import { HashLoader } from 'react-spinners';


type Props = {
  createGame: () => void
}

const StartGameButton: React.FC<Props> = ({ createGame }) => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <form action={createGame} className="flex justify-end w-full">
      <Button
        disabled={isLoading}
        style={{ width: "170px", height:"50px" }} // Set a fixed width for the button
        onClick={() => {
          setIsLoading(true)
          createGame()
        }}
      >
        {isLoading ? <HashLoader color="#B88C67" size = "24" /> : <span>Start a game</span>}
      </Button>
    </form>
  )
}

export default StartGameButton

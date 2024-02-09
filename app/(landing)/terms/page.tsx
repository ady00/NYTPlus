import React from 'react'
import { Heading } from '@radix-ui/themes'

export const metadata = {
  title: 'Terms',
  description: 'Terms of service',
}

const Page = () => {
  return (
    <div className="relative flex flex-col w-full gap-2 p-5 overflow-hidden border border-gray-300 rounded-md shadow-sm bg-gold-25 group">
      <Heading size="5">Terms of Service for NYTPlus</Heading>
      <p>
      </p>
      <div className="flex flex-col gap-4 m-auto mt-4 mb-8 max-w-prose">
        <Heading size="5">1. Introduction</Heading>
        <p>
          Welcome to NYTPlus, a collaborative online platform for solving
          crossword puzzles with friends. 
        </p>
      </div>
    </div>
  )
}

export default Page

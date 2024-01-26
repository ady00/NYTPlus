'use client'
import React, { useMemo } from 'react'
import { CookieIcon, Cross1Icon, FilePlusIcon } from '@radix-ui/react-icons'
import { Table, Text } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'

import { type Database } from '@/lib/database.types'

import CreatePuzzle from '../createPuzzle'
import { userAgent } from 'next/server'
import { type Session } from '@supabase/supabase-js'


type Props = {
  puzzles: Array<Database['public']['Tables']['puzzles']['Row']>
}

const Puzzles: React.FC<Props> = ({ puzzles }) => {
  const router = useRouter()

  

  const sortedPuzzles = useMemo(() => {
    return [...puzzles].sort((a, b) => {
        return a.created_at.localeCompare(b.created_at);
    });
}, [puzzles]);
  


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
            <Table.ColumnHeaderCell>Published</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sortedPuzzles?.map((puzzle) => {
            const puzzleUrl = `/play/puzzles/${puzzle.id}`
            return (
              <Table.Row
                role="link"
                onMouseOver={() => {
                  router.prefetch(puzzleUrl)
                }}
                onClick={() => {
                  router.push(puzzleUrl)
                }}
                className="cursor-pointer hover:bg-gray-100"
                key={puzzle.id}
              >
                <Table.RowHeaderCell>
                  <span className="truncate">{puzzle.name}</span>
                </Table.RowHeaderCell>
                <Table.Cell className="flex items-baseline">
                  {puzzle.rows} <Cross1Icon height={10} /> {puzzle.cols}
                </Table.Cell>
                <Table.Cell>
                {new Date(puzzle.created_at).toLocaleDateString()}
                </Table.Cell>
              </Table.Row>
            )
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

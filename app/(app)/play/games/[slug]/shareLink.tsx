'use client'
import React, { useEffect, useState } from 'react'
import { ExternalLinkIcon } from '@radix-ui/react-icons'
import {
  Button,
  Flex,
  Heading,
  Popover,
  Text,
  TextField,
} from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { useCopyToClipboard } from 'usehooks-ts'

import { type Database } from '@/lib/database.types'

type Props = {
  game: Database['public']['Tables']['games']['Row']
}

const ShareLink: React.FC<Props> = ({ game }) => {
  const [, copy] = useCopyToClipboard()
  const [link, setLink] = useState('')

  useEffect(() => {
    setLink(
      `${window.location.origin}/play/games/${game.id}?key=${game.password}`,
    )
  }, [game])

  const copyInvite = async () => {
    await copy(link)
  }

  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button variant="soft">
          <ExternalLinkIcon />
          Share
        </Button>
      </Popover.Trigger>
      <Popover.Content align="end" size="2" className="max-w-md">
        <div className="flex flex-col">
          <Heading size="5">Share link</Heading>
          <Text size="2" mb="4" mt="2">
            Anyone with this link can join the game, or invite anyone else to
            join this game.
          </Text>

          <div className="flex flex-col gap-4">
          {link !== '' ? (
              <label>
                <p className="sr-only">Link</p>
                <TextField.Input
                  value={link}
                  disabled
                  className="w-full p-1 pl-1 pr-0"
                />
              </label>
            ) : (
              <Skeleton className="flex-1 h-8 p-1" />
            )}
          </div>

          <Flex gap="3" mt="4" justify="end">
            <Popover.Close>
              <Button onClick={copyInvite}>Copy and close</Button>
            </Popover.Close>
          </Flex>
        </div>
      </Popover.Content>
    </Popover.Root>
  )
}

export default ShareLink

'use client'
import React from 'react'
import {
  DotFilledIcon,
  FileIcon,
  HamburgerMenuIcon,
  HomeIcon,
} from '@radix-ui/react-icons'
import { IconButton, Link as RadixLink, Popover } from '@radix-ui/themes'
import NextLink from 'next/link'

import NYTPlusLogo from '@/components/crossyLogo'

import Link from './activeLink'
import CreatePuzzle from './createPuzzle'

const MobileNav = () => {
  return (
    <div className="flex items-center justify-between w-full gap-4 p-2 px-4">
      <NextLink href="/">
        <h1 className="flex items-center justify-center gap-1 font-serif text-lg font-bold text-center">
          <div className="w-8 h-8 text-white rounded-full bg-gold-800 p-0.5">
            <NYTPlusLogo />
          </div>
          NYTPlus
        </h1>
      </NextLink>

      <Popover.Root>
        <Popover.Trigger>
          <IconButton variant="ghost">
            <HamburgerMenuIcon />
          </IconButton>
        </Popover.Trigger>
        <Popover.Content align="end">
          <ul className="flex flex-col gap-4">
            <li>
              <Link href="/play" className="flex items-center gap-2">
                <HomeIcon />
                Games
              </Link>
            </li>
            <li>
              <Link href="/play/puzzles" className="flex items-center gap-2">
                <FileIcon />
                  Minis Cache
              </Link>
            </li>
            <li>
              <Link href="/play/puzzles_large" className="flex items-center gap-2">
                <FileIcon />
                  Full Crosswords
              </Link>
            </li>

            <hr className="border-dashed" />
            
          </ul>
        </Popover.Content>
      </Popover.Root>
      {/* <hr className="-mt-2 border-dashed" /> */}
    </div>
  )
}

export default MobileNav

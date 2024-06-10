'use client'
import React from 'react'
import { DotFilledIcon, FileIcon, HomeIcon, BookmarkIcon, ListBulletIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Link as RadixLink } from '@radix-ui/themes'
import NextLink from 'next/link'

import NYTPlusLogo from '@/components/crossyLogo'

import Link from './activeLink'
import CreatePuzzle from './createPuzzle'

const Nav = () => {
  return (
    <ul className="flex flex-col gap-4 px-2">
      <li className="">
        <NextLink href="/">
          <h1 className="flex items-center justify-center gap-1 py-2 font-serif text-lg font-bold text-center">
            <div className="w-8 h-8 text-white rounded-full bg-gold-800 p-0.5">
              <NYTPlusLogo />
            </div>
            NYTPlus
          </h1>
        </NextLink>
      </li>
      <hr className="-mt-2 border-dashed" />

      <li>
        <Link href="/play" className="flex items-center gap-2">
          <HomeIcon />
          Games
        </Link>
      </li>
      <li>
        <Link href="/play/puzzles" className="flex items-center gap-2">
          <FileIcon />
          Puzzles
        </Link>
      </li>
      
            <li>
              <Link href="/play/leaderboard" className="flex items-center gap-2">
                <ListBulletIcon />
                  Leaderboard  
                  <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700">
                    Fixed!
                  </span>
              </Link>
              
            </li>

            <li>
              <Link href="/play/stats" className="flex items-center gap-2">
                <MagnifyingGlassIcon />
                  Stats
                  <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700">
                    Fixed!
                  </span>
              </Link>
            </li>
      

      {/* <hr className="border-dashed" /> */}
      {/* 
      <li>
      <RadixLink asChild>
        <a
          target="_blank"
          rel="noreferrer noopener"
          href="https://discord.com/api/oauth2/authorize?client_id=1179137043138355200&permissions=2147534912&scope=bot"
          className="flex items-center gap-2"
        >
          <DiscordLogoIcon />
          Invite Bot
          <ExternalLinkIcon />
        </a>
      </RadixLink>
    </li>
    <hr className="border-dashed" /> */}
      <hr className="border-dashed" />
      
    </ul>
  )
}

export default Nav

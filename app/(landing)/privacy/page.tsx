import React from 'react'
import { Heading } from '@radix-ui/themes'

export const metadata = {
  title: 'about',
  description: 'about for NYTPlus',
}

const Page = () => {
  return (
    <div className="relative flex flex-col w-full gap-2 p-5 overflow-hidden border border-gray-300 rounded-md shadow-sm bg-gold-25 group">
      <Heading size="5">About this Site.</Heading>
      <p>
      </p>
      <div className="flex flex-col gap-4 m-auto mt-4 mb-8 max-w-prose">
        <Heading size="5">1. Why?</Heading>
        <p>
          I love the NYT Daily Mini, and to a greater extent, crosswords in general. It's a fun, stimulating game that everyone should
          try at least once, in my opinion. And for years, the NYT Crossword (and now, the Mini) have become stalwart constants in the realm
          of word games, thanks in part to their superior design and challenge.
          <br></br><br></br>
          Nevertheless, the NYT Mini is limited to a singular daily play; a restriction that, in my view, severely limits the 
          enjoyability of the Mini. This was the impetus behind NYTPlus. 
          </p>

        <Heading size="5">2. Information Collection</Heading>
        <p>
          Every day, at about 9 PM, I collect the next day's NYT crossword. I am NOT screen-scraping the NYT Games site,
          but rather utilizing their daily Mini JSON (that is publically available and free), which is then cached and stored 
          to be used in NYTPlus.<br>
          </br>
        </p>

        <Heading size="5">3. Expansion</Heading>
        <p>
          I will likely soon also cache and allow users to access 15x15 crosswords as well (the normal NYT crossword, essentially)
          thanks to the kind work of <u><a href = "https://github.com/doshea/nyt_crosswords">https://github.com/doshea/nyt_crosswords.</a></u>
        </p>

        <Heading size="5">4. Data</Heading>
        <p>
          NYTPlus only has access to your profile picture and public email. The site never accesses any 
          forbidden scopes (and you can check this for yourself when first signing in via a service provider, too).

        </p>

        <Heading size="5">5. Collaborative Sharing</Heading>
        <p>
          It is possible to share a crossword game with other players if you are struggling.
          However, there is no fast refresh. Perhaps later down the line I will add this feature, 
          but it will greatly increase my server cost (and therefore something I don't want to do).
        </p>

        

        <Heading size="5">6. Legalities</Heading>
        <p>
          Hmm.
        </p>

        <Heading size="5">8. Final Thoughts</Heading>
        <p>
          There are still a plethora of bugs and issues on this site. If you find them, send me an email: advayb2018 [at] gmail [.] com.
        </p>

        
      </div>
    </div>
  )
}

export default Page

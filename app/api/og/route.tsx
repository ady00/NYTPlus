import { ImageResponse } from 'next/og'

import { type Database } from '@/lib/database.types'
import { dangerouslyCreateServiceRoleClient } from '@/utils/supabase/server'

const empty = (
  <div tw="flex items-center justify-center w-full h-full">
    <div tw="flex bg-[#8c7a5e] text-white rounded-full p-1">
      <svg
        height="32"
        aria-label="NYTPlus Monogram"
        viewBox="0 0 1080 1080"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path
            d="M714.413 679.414L737.363 720.724C654.743 770.296 576.713 807.016 493.175 807.016C334.361 807.016 194.825 696.856 194.825 494.896C194.825 274.576 356.393 153.4 527.141 153.4C591.401 153.4 656.579 170.842 714.413 205.726V352.606L670.349 361.786L636.383 265.396C588.647 228.676 540.911 209.398 493.175 209.398C390.359 209.398 332.525 292.018 332.525 454.504C332.525 631.678 419.735 733.576 543.665 733.576C596.909 733.576 640.973 713.38 714.413 679.414ZM595.266 941.044L649.428 796L470.418 424.21C466.746 415.948 462.156 410.44 453.894 407.686L411.666 394.834L420.846 350.77H654.936L649.428 393.916L587.922 405.85L700.836 666.562L782.538 436.144C785.292 428.8 787.128 421.456 787.128 417.784C787.128 411.358 784.375 407.686 777.949 405.85L726.54 393.916L733.884 350.77H908.304L901.879 394.834L858.733 405.85L676.05 878.62C644.838 959.404 591.594 992.452 528.252 992.452C475.926 992.452 430.944 966.748 430.944 925.438C430.944 891.472 452.976 865.768 491.532 865.768H532.842V938.29C542.94 944.716 553.956 948.388 564.054 948.388C574.152 948.388 584.25 945.634 595.266 941.044Z"
            fill="currentColor"
          />
        </g>
      </svg>
    </div>
    <div tw="flex ml-2">
      <svg
        height="32"
        viewBox="0 0 810 344"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M162.112 224.456L168.912 236.696C144.432 251.384 121.312 262.264 96.56 262.264C49.504 262.264 8.16 229.624 8.16 169.784C8.16 104.504 56.032 68.6 106.624 68.6C125.664 68.6 144.976 73.768 162.112 84.104V127.624L149.056 130.344L138.992 101.784C124.848 90.904 110.704 85.192 96.56 85.192C66.096 85.192 48.96 109.672 48.96 157.816C48.96 210.312 74.8 240.504 111.52 240.504C127.296 240.504 140.352 234.52 162.112 224.456ZM255.142 259H176.262L177.622 246.488L196.934 242.408V146.392L176.534 142.04L175.718 129.8L231.478 123.816V142.856L258.678 124.904C261.126 124.088 263.846 123.816 266.294 123.816C278.534 123.816 292.134 130.072 292.134 145.304C292.134 157.816 283.158 164.888 272.006 164.888H261.126V157.544C261.126 150.2 257.046 146.664 252.694 144.76L231.478 154.28V237.512C231.478 240.504 232.838 241.864 236.374 242.68L256.774 246.488L255.142 259ZM365.413 250.568C387.173 250.568 393.429 219.832 393.429 204.056C393.429 182.024 384.725 136.328 359.157 136.328C337.125 136.328 331.141 165.704 331.141 183.656C331.141 205.144 340.117 250.568 365.413 250.568ZM359.157 262.264C318.357 262.264 296.053 235.88 296.053 196.168C296.053 152.648 330.869 123.816 365.413 123.816C406.213 123.816 428.517 150.2 428.517 189.912C428.517 233.432 393.701 262.264 359.157 262.264ZM534.588 164.344L523.708 165.704L517.18 146.12C511.74 141.768 501.676 136.6 492.156 136.6C483.452 136.6 477.196 140.68 477.196 148.84C477.196 176.856 544.652 175.768 544.652 217.656C544.652 247.848 518.54 262.264 491.612 262.264C476.108 262.264 459.244 257.64 448.364 248.392L449.724 212.488L461.148 211.128L467.132 235.88C475.836 244.584 487.26 249.752 497.324 249.752C507.116 249.752 516.364 245.672 516.364 234.52C516.364 206.232 449.996 204.328 449.996 165.432C449.996 137.416 474.476 123.816 501.132 123.816C513.372 123.816 525.068 126.536 535.948 132.792L534.588 164.344ZM650.401 164.344L639.521 165.704L632.993 146.12C627.553 141.768 617.489 136.6 607.969 136.6C599.265 136.6 593.009 140.68 593.009 148.84C593.009 176.856 660.465 175.768 660.465 217.656C660.465 247.848 634.353 262.264 607.425 262.264C591.921 262.264 575.057 257.64 564.177 248.392L565.537 212.488L576.961 211.128L582.945 235.88C591.649 244.584 603.073 249.752 613.137 249.752C622.929 249.752 632.177 245.672 632.177 234.52C632.177 206.232 565.809 204.328 565.809 165.432C565.809 137.416 590.289 123.816 616.945 123.816C629.185 123.816 640.881 126.536 651.761 132.792L650.401 164.344ZM715.832 301.976L731.88 259L678.84 148.84C677.752 146.392 676.392 144.76 673.944 143.944L661.432 140.136L664.152 127.08H733.512L731.88 139.864L713.656 143.4L747.112 220.648L771.32 152.376C772.136 150.2 772.68 148.024 772.68 146.936C772.68 145.032 771.864 143.944 769.96 143.4L754.728 139.864L756.904 127.08H808.584L806.68 140.136L793.896 143.4L739.768 283.48C730.52 307.416 714.744 317.208 695.976 317.208C680.472 317.208 667.144 309.592 667.144 297.352C667.144 287.288 673.672 279.672 685.096 279.672H697.336V301.16C700.328 303.064 703.592 304.152 706.584 304.152C709.576 304.152 712.568 303.336 715.832 301.976Z"
          fill="currentColor"
        />
      </svg>
    </div>
  </div>
)

export const runtime = 'edge'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const gameId = requestUrl.searchParams.get('game') ?? ''

  const dangerousSupabase = dangerouslyCreateServiceRoleClient<Database>()

  if (!gameId) {
    return new ImageResponse(empty)
  }

  const { error: dangerousError, data: dangerousGame } = await dangerousSupabase
    .from('games')
    .select('*, puzzle_id(*)')
    .eq('id', gameId)
    .single()

  if (dangerousError ?? !dangerousGame) {
    return new ImageResponse(empty)
  }

  const cols = (dangerousGame.puzzle_id as any).cols
  const rows = (dangerousGame.puzzle_id as any).rows
  const grid = (dangerousGame.puzzle_id as any).grid

  const cellSize = 24 // This can be adjusted for different cell sizes
  const width = cols * cellSize
  const height = rows * cellSize

  return new ImageResponse(
    (
      <div tw="flex items-center justify-center w-full h-full bg-white">
        <div tw="absolute flex items-center top-5 left-6">
          <div tw="flex bg-[#8c7a5e] text-white rounded-full p-1">
            <svg
              height="32"
              aria-label="NYTPlus Monogram"
              viewBox="0 0 1080 1080"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path
                  d="M714.413 679.414L737.363 720.724C654.743 770.296 576.713 807.016 493.175 807.016C334.361 807.016 194.825 696.856 194.825 494.896C194.825 274.576 356.393 153.4 527.141 153.4C591.401 153.4 656.579 170.842 714.413 205.726V352.606L670.349 361.786L636.383 265.396C588.647 228.676 540.911 209.398 493.175 209.398C390.359 209.398 332.525 292.018 332.525 454.504C332.525 631.678 419.735 733.576 543.665 733.576C596.909 733.576 640.973 713.38 714.413 679.414ZM595.266 941.044L649.428 796L470.418 424.21C466.746 415.948 462.156 410.44 453.894 407.686L411.666 394.834L420.846 350.77H654.936L649.428 393.916L587.922 405.85L700.836 666.562L782.538 436.144C785.292 428.8 787.128 421.456 787.128 417.784C787.128 411.358 784.375 407.686 777.949 405.85L726.54 393.916L733.884 350.77H908.304L901.879 394.834L858.733 405.85L676.05 878.62C644.838 959.404 591.594 992.452 528.252 992.452C475.926 992.452 430.944 966.748 430.944 925.438C430.944 891.472 452.976 865.768 491.532 865.768H532.842V938.29C542.94 944.716 553.956 948.388 564.054 948.388C574.152 948.388 584.25 945.634 595.266 941.044Z"
                  fill="currentColor"
                />
              </g>
            </svg>
          </div>
          <div tw="flex ml-2">
            <svg
              height="32"
              viewBox="0 0 810 344"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M162.112 224.456L168.912 236.696C144.432 251.384 121.312 262.264 96.56 262.264C49.504 262.264 8.16 229.624 8.16 169.784C8.16 104.504 56.032 68.6 106.624 68.6C125.664 68.6 144.976 73.768 162.112 84.104V127.624L149.056 130.344L138.992 101.784C124.848 90.904 110.704 85.192 96.56 85.192C66.096 85.192 48.96 109.672 48.96 157.816C48.96 210.312 74.8 240.504 111.52 240.504C127.296 240.504 140.352 234.52 162.112 224.456ZM255.142 259H176.262L177.622 246.488L196.934 242.408V146.392L176.534 142.04L175.718 129.8L231.478 123.816V142.856L258.678 124.904C261.126 124.088 263.846 123.816 266.294 123.816C278.534 123.816 292.134 130.072 292.134 145.304C292.134 157.816 283.158 164.888 272.006 164.888H261.126V157.544C261.126 150.2 257.046 146.664 252.694 144.76L231.478 154.28V237.512C231.478 240.504 232.838 241.864 236.374 242.68L256.774 246.488L255.142 259ZM365.413 250.568C387.173 250.568 393.429 219.832 393.429 204.056C393.429 182.024 384.725 136.328 359.157 136.328C337.125 136.328 331.141 165.704 331.141 183.656C331.141 205.144 340.117 250.568 365.413 250.568ZM359.157 262.264C318.357 262.264 296.053 235.88 296.053 196.168C296.053 152.648 330.869 123.816 365.413 123.816C406.213 123.816 428.517 150.2 428.517 189.912C428.517 233.432 393.701 262.264 359.157 262.264ZM534.588 164.344L523.708 165.704L517.18 146.12C511.74 141.768 501.676 136.6 492.156 136.6C483.452 136.6 477.196 140.68 477.196 148.84C477.196 176.856 544.652 175.768 544.652 217.656C544.652 247.848 518.54 262.264 491.612 262.264C476.108 262.264 459.244 257.64 448.364 248.392L449.724 212.488L461.148 211.128L467.132 235.88C475.836 244.584 487.26 249.752 497.324 249.752C507.116 249.752 516.364 245.672 516.364 234.52C516.364 206.232 449.996 204.328 449.996 165.432C449.996 137.416 474.476 123.816 501.132 123.816C513.372 123.816 525.068 126.536 535.948 132.792L534.588 164.344ZM650.401 164.344L639.521 165.704L632.993 146.12C627.553 141.768 617.489 136.6 607.969 136.6C599.265 136.6 593.009 140.68 593.009 148.84C593.009 176.856 660.465 175.768 660.465 217.656C660.465 247.848 634.353 262.264 607.425 262.264C591.921 262.264 575.057 257.64 564.177 248.392L565.537 212.488L576.961 211.128L582.945 235.88C591.649 244.584 603.073 249.752 613.137 249.752C622.929 249.752 632.177 245.672 632.177 234.52C632.177 206.232 565.809 204.328 565.809 165.432C565.809 137.416 590.289 123.816 616.945 123.816C629.185 123.816 640.881 126.536 651.761 132.792L650.401 164.344ZM715.832 301.976L731.88 259L678.84 148.84C677.752 146.392 676.392 144.76 673.944 143.944L661.432 140.136L664.152 127.08H733.512L731.88 139.864L713.656 143.4L747.112 220.648L771.32 152.376C772.136 150.2 772.68 148.024 772.68 146.936C772.68 145.032 771.864 143.944 769.96 143.4L754.728 139.864L756.904 127.08H808.584L806.68 140.136L793.896 143.4L739.768 283.48C730.52 307.416 714.744 317.208 695.976 317.208C680.472 317.208 667.144 309.592 667.144 297.352C667.144 287.288 673.672 279.672 685.096 279.672H697.336V301.16C700.328 303.064 703.592 304.152 706.584 304.152C709.576 304.152 712.568 303.336 715.832 301.976Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
        <div
          style={{
            aspectRatio: `${cols}/${rows}`,
          }}
          tw="relative flex items-center justify-center flex-1 w-full h-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 ${width} ${height}`}
            height="550px"
            preserveAspectRatio="xMidYMin meet"
            // @ts-expect-error: tw is not a valid default prop for svg, but it is in OG
            tw="border-2 border-black"
            style={{
              aspectRatio: `${cols}/${rows}`,
            }}
          >
            {grid.map((_: any, i: number) => {
              let backgroundColor = '#ffffff'
              if (grid[i] === '.') {
                backgroundColor = '#000000c0'
              }

              const row = Math.floor(i / cols)
              const col = i % cols

              return (
                <g key={i}>
                  <rect
                    x={col * cellSize}
                    y={row * cellSize}
                    width={cellSize}
                    height={cellSize}
                    fill={backgroundColor}
                    stroke="#00000050"
                    strokeWidth={0.6}
                  />
                </g>
              )
            })}
          </svg>
        </div>
      </div>
    ),
  )
}

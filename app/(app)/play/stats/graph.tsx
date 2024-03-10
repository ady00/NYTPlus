'use client'

import { useEffect, useState } from 'react'
import { Tabs } from '@radix-ui/themes'


type Props = {
  mean: {
    monthly: string;
    weekly: string;
    alltime: string;
  };
  median: {
    monthly: string;
    weekly: string;
    alltime: string;
  };
  fastest: {
    monthly: string;
    weekly: string;
    alltime: string;
  };
  slowest: {
    monthly: string;
    weekly: string;
    alltime: string;
  };
}
const Graph: React.FC<Props> = ({ mean, median, fastest, slowest }) => {
  

return (
    <>

      <Tabs.Root defaultValue="weekly">

      <Tabs.List size = "2">
      <Tabs.Trigger value="weekly">Weekly</Tabs.Trigger>
      <Tabs.Trigger value="monthly">Monthly</Tabs.Trigger>
      <Tabs.Trigger value="alltime">All Time</Tabs.Trigger>

    </Tabs.List>

    <Tabs.Content value="weekly">
    <div className = "mx-2 my-2">
      <p className="text-xl text-center mb-4">Weekly</p>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
        <div className="h-32 rounded-lg flex flex-col justify-center items-center border border-dashed border-gray-400">
          <p className="text-xl">{mean.weekly}</p>
          <p className="text-sm">Average Time</p>
        </div>
        <div className="h-32 rounded-lg flex flex-col justify-center items-center border border-dashed border-gray-400">
          <p className="text-xl">{median.weekly}</p>
          <p className="text-sm">Median Time</p>
        </div>
        <div className="h-32 rounded-lg flex flex-col justify-center items-center border border-dashed border-gray-400">
          <p className="text-xl">{fastest.weekly}</p>
          <p className="text-sm">Fastest Time</p>
        </div>
        <div className="h-32 rounded-lg flex flex-col justify-center items-center border border-dashed border-gray-400">
          <p className="text-xl">{slowest.weekly}</p>
          <p className="text-sm">Slowest Time</p>
        </div>
      </div>
      </div>    </Tabs.Content>

    <Tabs.Content value="monthly">
    <div className = "mx-2 my-2">
      <p className="text-xl text-center mb-4">Monthly</p>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
        <div className="h-32 rounded-lg flex flex-col justify-center items-center border border-dashed border-gray-400">
          <p className="text-xl">{mean.monthly}</p>
          <p className="text-sm">Average Time</p>
        </div>
        <div className="h-32 rounded-lg flex flex-col justify-center items-center border border-dashed border-gray-400">
          <p className="text-xl">{median.monthly}</p>
          <p className="text-sm">Median Time</p>
        </div>
        <div className="h-32 rounded-lg flex flex-col justify-center items-center border border-dashed border-gray-400">
          <p className="text-xl">{fastest.monthly}</p>
          <p className="text-sm">Fastest Time</p>
        </div>
        <div className="h-32 rounded-lg flex flex-col justify-center items-center border border-dashed border-gray-400">
          <p className="text-xl">{slowest.monthly}</p>
          <p className="text-sm">Slowest Time</p>
        </div>
      </div>
      </div>
    </Tabs.Content>

    <Tabs.Content value="alltime">
      <div className = "mx-2 my-2">
      <p className="text-xl text-center mb-4">All Time</p>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
        <div className="h-32 rounded-lg flex flex-col justify-center items-center border border-dashed border-gray-400">
          <p className="text-xl">{mean.alltime}</p>
          <p className="text-sm">Average Time</p>
        </div>
        <div className="h-32 rounded-lg flex flex-col justify-center items-center border border-dashed border-gray-400">
          <p className="text-xl">{median.alltime}</p>
          <p className="text-sm">Median Time</p>
        </div>
        <div className="h-32 rounded-lg flex flex-col justify-center items-center border border-dashed border-gray-400">
          <p className="text-xl">{fastest.alltime}</p>
          <p className="text-sm">Fastest Time</p>
        </div>
        <div className="h-32 rounded-lg flex flex-col justify-center items-center border border-dashed border-gray-400">
          <p className="text-xl">{slowest.alltime}</p>
          <p className="text-sm">Slowest Time</p>
        </div>
      </div>
      </div>
    </Tabs.Content>

      </Tabs.Root>

    </>
  )
}

export default Graph
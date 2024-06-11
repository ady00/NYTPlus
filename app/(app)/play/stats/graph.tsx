'use client'

import { useEffect, useState } from 'react'
import { Tabs } from '@radix-ui/themes'
import { list } from 'postcss'
import Chart from 'chart.js/auto'; // Import the Chart.js library

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface GameObject {
  formattedTime: string;
  date: Date;
}

type Props = {
  gameStats: GameObject[];
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

const Graph: React.FC<Props> = ({ mean, median, fastest, slowest, gameStats }) => {

  const filteredGameStats: GameObject[] = [];
  const dateMap = new Map<string, GameObject>();

  gameStats.forEach(stats => {
    const dateKey = stats.date.toDateString();

    if (!dateMap.has(dateKey)) {
      dateMap.set(dateKey, stats);
    } else {
      const existingStats = dateMap.get(dateKey)!;
      const existingTime = new Date(existingStats.date).getTime();
      const newTime = new Date(stats.date).getTime();

      if (newTime < existingTime) {
        dateMap.set(dateKey, stats);
      }
    }
  });

  dateMap.forEach(value => filteredGameStats.push(value));


  // Extract dates


  

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const monthAgo = new Date();
  monthAgo.setDate(monthAgo.getDate() - 30);

  const allTimeFormattedTimesInSeconds: number[] = filteredGameStats
    .map(stats => {
      const [minutes, seconds] = stats.formattedTime.split(':').map(Number);
      return minutes * 60 + seconds;
    })
    .filter(timeInSeconds => timeInSeconds <= 3500);

  const weekGameStats = filteredGameStats.filter(stats => stats.date >= weekAgo);
  const weekFormattedTimesInSeconds: number[] = weekGameStats
    .map(stats => {
      const [minutes, seconds] = stats.formattedTime.split(':').map(Number);
      return minutes * 60 + seconds;
    })
    .filter(timeInSeconds => timeInSeconds <= 4000);
  const weekDates: Date[] = weekGameStats.map(stats => stats.date);

  const monthGameStats = filteredGameStats.filter(stats => stats.date >= monthAgo);
  const monthFormattedTimesInSeconds: number[] = monthGameStats
    .map(stats => {
      const [minutes, seconds] = stats.formattedTime.split(':').map(Number);
      return minutes * 60 + seconds;
    })
    .filter(timeInSeconds => timeInSeconds <= 4000);
  const monthDates: Date[] = monthGameStats.map(stats => stats.date);
  const allDates: Date[] = filteredGameStats.map(stats => stats.date);


  const weekData = {
    labels: weekDates.map(date => date.toDateString()), // Convert dates to string
    datasets: [
      {
        label: 'NYT Puzzle Stats (Past Week)',
        data: weekFormattedTimesInSeconds,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      }
    ]
  };

  const monthData = {
    labels: monthDates.map(date => date.toDateString()), // Convert dates to string
    datasets: [
      {
        label: 'NYT Puzzle Stats (Past Month)',
        data: monthFormattedTimesInSeconds,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      }
    ]
  };

  const allTimeData = {
    labels: allDates.map(date => date.toDateString()), 
    datasets: [
      {
        label: 'NYT Puzzle Stats (All Time)',
        data: allTimeFormattedTimesInSeconds,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      }
    ]
  };

  const options = {
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 13,
        },
      },
      y: {
        stacked: true,
        gridLines: {
          color: '#e6e6e6',
          drawBorder: false,
        },
        title: {
          display: true,
          text: 'Seconds Taken', // Label for the y-axis
        }
      }
    }
  };

  

return (
    <>

      <Tabs.Root defaultValue="weekly">

        

      <Tabs.List size = "2">
      <Tabs.Trigger value="weekly">Weekly</Tabs.Trigger>
      <Tabs.Trigger value="monthly">Monthly</Tabs.Trigger>
      <Tabs.Trigger value="alltime">All Time</Tabs.Trigger>

    </Tabs.List>

    <Tabs.Content value="weekly">

    <div>
    </div>



    <div className = "mx-2 my-2">
      <p className="text-xl text-center mb-4">Weekly</p>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
        <div className="h-32 rounded-lg flex flex-col justify-center items-center border border-dashed border-gray-400">
          <p className="text-xl px-2 text-center">{mean.weekly}</p>
          <p className="italic text-sm">Average Time</p>
        </div>
        <div className="h-32 rounded-lg flex flex-col justify-center items-center border border-dashed border-gray-400">
          <p className="text-xl px-2 text-center">{median.weekly}</p>
          <p className="italic text-sm">Median Time</p>
        </div>
        <div className="h-32 rounded-lg flex flex-col justify-center items-center border border-dashed border-gray-400">
          <p className="text-xl px-2 text-center">{fastest.weekly}</p>
          <p className="italic text-sm">Fastest Time</p>
        </div>
        <div className="h-32 rounded-lg flex flex-col justify-center items-center border border-dashed border-gray-400">
          <p className="text-xl px-2 text-center">{slowest.weekly}</p>
          <p className="italic text-sm">Slowest Time</p>
        </div>
      </div>
      <Line data={weekData} options = {options}/>

      </div>    
      </Tabs.Content>

    <Tabs.Content value="monthly">
    <div className = "mx-2 my-2">
      <p className="text-xl text-center mb-4">Monthly</p>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
        <div className="h-32 rounded-lg flex flex-col justify-center items-center border border-dashed border-gray-400">
          <p className="text-xl px-2 text-center">{mean.monthly}</p>
          <p className="italic italic text-sm">Average Time</p>
        </div>
        <div className="h-32 rounded-lg flex flex-col justify-center items-center border border-dashed border-gray-400">
          <p className="text-xl px-2 text-center">{median.monthly}</p>
          <p className="italic text-sm">Median Time</p>
        </div>
        <div className="h-32 rounded-lg flex flex-col justify-center items-center border border-dashed border-gray-400">
          <p className="text-xl px-2 text-center">{fastest.monthly}</p>
          <p className="italic text-sm">Fastest Time</p>
        </div>
        <div className="h-32 rounded-lg flex flex-col justify-center items-center border border-dashed border-gray-400">
          <p className="text-xl px-2 text-center">{slowest.monthly}</p>
          <p className="italic text-sm">Slowest Time</p>
        </div>
      </div>
      <Line data={monthData} options = {options} />

      </div>
    </Tabs.Content>

    <Tabs.Content value="alltime">
      <div className = "mx-2 my-2">
      <p className="text-xl text-center mb-4">All Time</p>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
        <div className="h-32 rounded-lg flex flex-col justify-center items-center border border-dashed border-gray-400">
          <p className="text-xl px-2 text-center">{mean.alltime}</p>
          <p className="italic text-sm">Average Time</p>
        </div>
        <div className="h-32 rounded-lg flex flex-col justify-center items-center border border-dashed border-gray-400">
          <p className="text-xl px-2 text-center">{median.alltime}</p>
          <p className="italic text-sm">Median Time</p>
        </div>
        <div className="h-32 rounded-lg flex flex-col justify-center items-center border border-dashed border-gray-400">
          <p className="text-xl px-2 text-center">{fastest.alltime}</p>
          <p className="italic text-sm">Fastest Time</p>
        </div>
        <div className="h-32 rounded-lg flex flex-col justify-center items-center border border-dashed border-gray-400">
          <p className="text-xl px-2 text-center">{slowest.alltime}</p>
          <p className="italic text-sm">Slowest Time</p>
        </div>
      </div>
      <Line data={allTimeData} options = {options}/>

      </div>
    </Tabs.Content>

      </Tabs.Root>

    </>
  )
}

export default Graph
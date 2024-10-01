"use client"
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import colors from '@/helpers/colors.helper';
import { IDataVote } from '@/interfaces/IVotesResult';
import { useState } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

const Graph = ({dataCan}:{dataCan:IDataVote[]}) => {
  
  let names:string[] = []
  let votes:number[]= []
  let colorBackground:string[]= []
  let colorBorder:string[]= []
  
  dataCan && dataCan.map((data)=>{
    names.push(data.name)
    votes.push(data.votes)
    colorBackground.push(data.backgroundColor)
    colorBorder.push(data.borderColor)
  })
    

  const data = {
    labels: names,
    datasets: [
      {
        label: 'Votos',
        data: votes,
        backgroundColor: colorBackground,
        borderColor: colorBorder
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true, 
        position: 'left' as const,
        labels: {
          boxWidth: 30,
          padding: 15,  
        },
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default Graph;
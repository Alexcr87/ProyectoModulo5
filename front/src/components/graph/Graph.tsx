
"use client"
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { IDataVote } from '@/interfaces/IVotesResult';
import { getWitheVote } from '@/helpers/campaña.helper';
import { useEffect, useState } from 'react';



 ChartJS.register(ArcElement, Tooltip, Legend);

 interface dataProps{
  dataCan:IDataVote[]
  id: string
 }


const Graph = ({dataCan, id}:dataProps) => {

 const [chartData, setChartData] = useState<any> (null)
 const [loading, setLoading] = useState(true)

 useEffect(()=>{
  const fetchWhiteVotes = async () => {
    try {
      const whiteVotes = await getWitheVote(id);
      let names:string[] = ["Voto en blanco"]
      let votes:number[]= [whiteVotes]
      let colorBackground:string[]= ["#ffffff33"]
      let colorBorder:string[]= ["#ffffff"]
      
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
    setChartData(data)
    setLoading(false)
    
    } catch (error) {
      console.error('Error fetching white votes:', error);
        setLoading(false);
    }}
    fetchWhiteVotes()
  },[dataCan, id])

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

  if (loading) return <p>Cargando...</p>;

  return chartData ? <Doughnut data={chartData} options={options} />:<p>No hay datos</p>;
 };

 export default Graph;


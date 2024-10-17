'use client'
import React, { useEffect, useState } from 'react';
import Graph from '../graph/Graph';
import Image from 'next/image';
import { IDataVote, IVotesResult } from '@/interfaces/IVotesResult';
import colors from '@/helpers/colors.helper';
import Spinner from '../ui/Spinner';
import { getWitheVote } from '@/helpers/campaña.helper';

interface ResultProps {
  data: IVotesResult[]
  id: string
}

const Results: React.FC<ResultProps> = ({ data, id }) => {
  const [dataCan, setDataCan] = useState<IDataVote[]>([]);
  const [totalVotes, setTotalVotes] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [whitePercen, setWhitePercen] = useState<number>(0)
  const [whiteVote, setWhiteVote] = useState<number>(0)


  useEffect(() => {
    const fetchData = async () => {
      const whiteVotes = await getWitheVote(id);
      
      if (!Array.isArray(data)) {
        console.error('Expected data to be an array, but got', data);
        return;
      }

      let total = whiteVotes;
      setWhiteVote(Number(total))
      const dataCandidate: IDataVote[] = [];

      data.forEach((item)=>{
        total += item.votes;
      })

      data.forEach((item, index) => {
        
        const obj = {
          name: item.user.name, 
          votes: item.votes,
          image: item.imgUrl, 
          backgroundColor: colors.backgroundColor[index],
          borderColor: colors.borderColor[index],
        };
        dataCandidate.push(obj);
      });

      const percenWhite = (whiteVotes/ total) * 100

      setWhitePercen(percenWhite)
      setDataCan(dataCandidate);
      setTotalVotes(total);
      setIsLoading(false);
    }

    fetchData();
  }, [data]); 
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner /> 
      </div>
    );
  }

  return (
    <div className='bg-cuartiaryColor flex justify-center'>
      <div className='w-full md:w-11/12 bg-white mt-2 min-h-dvh rounded-t-3xl shadow-2xl p-8'>
        <div className='flex justify-center'>
          <h1 className='md:text-3xl font-bold'>Resultado de Votaciones</h1>
        </div>
        <div className='flex flex-col md:flex-row gap-8 bg-cuartiaryColor rounded-3xl'>
          <div className='w-full md:w-[50%] justify-center flex flex-col md:ml-2'>
          <div className='flex w-full items-center border-2 bg-white p-4 mb-2 rounded-xl'>
                  <Image src="/images/blankVote.jpg" alt={`voto en blaco`} width={100} height={100} className='rounded-full object-cover' />
                  <div className='flex flex-col w-full mr-4 items-center'>
                    <p>Voto en blanco</p>
                    <div className={`w-full bg-blue-200 rounded-full dark:bg-gray-700 ml-4 h-4`}>
                      <div style={{ backgroundColor: "#ffffff",  width: `${whitePercen}%`, border:"solid 1px black"  }} 
                        className={`text-xs font-medium text-center p-0.5 leading-none rounded-full`} 
                      > 
                        {whiteVote} 
                      </div>
                    </div>
                  </div>
                </div>
            {dataCan && dataCan.map((candidate, index) => {
              let percentage = 0;

              if (candidate.votes > 0) {
                percentage = (candidate.votes / totalVotes) * 100;
              }

              return (
                <div className='flex w-full items-center border-2 bg-white p-4 mb-2 rounded-xl' key={index}>
                  <Image src={candidate.image} alt={`perfil${candidate.name}`} width={100} height={100} className='rounded-full object-cover' />
                  <div className='flex flex-col w-full mr-4 items-center'>
                    <p>{candidate.name}</p>
                    <div className={`w-full bg-blue-200 rounded-full dark:bg-gray-700 ml-4 h-4`}>
                      <div style={{ backgroundColor: candidate.borderColor,  width: `${percentage}%`  }} 
                        className={`text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full`} 
                      > 
                        {candidate.votes} 
                      </div>
                    </div>
                  </div>
                </div>
              )
            })} 
          </div>
          <div className='w-full md:w-[50%]'>
            <Graph dataCan={dataCan} id={id}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Results;


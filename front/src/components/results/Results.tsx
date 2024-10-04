'use client'
import React, { useEffect, useState } from 'react';
import Graph from '../graph/Graph';
import Image from 'next/image';
import { IDataVote, IVotesResult } from '@/interfaces/IVotesResult';
import colors from '@/helpers/colors.helper';

const Results: React.FC<{ data: IVotesResult[] }> = ({ data }) => {
  const [dataCan, setDataCan] = useState<IDataVote[]>([]);
  const [totalVotes, setTotalVotes] = useState<number>(0);

  useEffect(() => {
    const fetchData = () => {
      const datas = data;

      if (!Array.isArray(datas)) {
        console.error('Expected data to be an array');
        return;
      }

      

      let total = 0;
      const dataCandidate: IDataVote[] = [];

      for (let i = 0; i < datas.length; i++) {
        datas[0].votes = 10
        datas[1].votes = 100

        total += datas[i].votes; 
      }

      datas.forEach((item, index) => {
        const obj = {
          name: item.user.name, 
          votes: item.votes,
          image: item.imgUrl, 
          backgroundColor: colors.backgroundColor[index],
          borderColor: colors.borderColor[index],
        };
        dataCandidate.push(obj);
      });

      setDataCan(dataCandidate);
      setTotalVotes(total);
    }

    fetchData();
  }, [data]); // Agregar 'data' como dependencia

  return (
    <div className='bg-cuartiaryColor flex justify-center'>
      <div className='w-full md:w-11/12 bg-white mt-2 min-h-dvh rounded-t-3xl shadow-2xl p-8'>
        <div className='flex justify-center'>
          <h1 className='md:text-3xl font-bold'>Resultado de Votaciones</h1>
        </div>
        <div className='flex flex-col md:flex-row gap-8 bg-cuartiaryColor rounded-3xl'>
          <div className='w-full md:w-[50%] justify-center flex flex-col md:ml-2'>
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
            <Graph dataCan={dataCan}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Results;


'use client'
import React, { useEffect, useState } from 'react'
import Graph from '../graph/Graph'
import Image from 'next/image'
import { getCampañaByID } from '@/helpers/campaña.helper'
import { IDataVote, IVotesResult } from '@/interfaces/IVotesResult'
import colors from '@/helpers/colors.helper'


// const Results = () => {


  const [dataCan, setDataCan] =  useState<IDataVote[]>([]);
  const [totalVotes, setTotalVotes] = useState<number>(0)

  const fecthData = async ()=>{

    const datas = await getCampañaByID()

    console.log(datas);
    

    let total = 0
    const dataCandidate:IDataVote[] = []

    for(let i=0; i < datas.length; i++){
      total += datas[i].votes; 
    }
    
    datas && datas.map((data, index)=>{
      const obj = {
        name: data.user.name, 
        votes: data.votes,
        image: data.imgUrl, 
        backgroundColor: colors.backgroundColor[index],
        borderColor: colors.borderColor[index],
      };
      dataCandidate.push(obj)
    })

    setDataCan(dataCandidate);
    setTotalVotes(total);
    
  }
  useEffect(()=>{
    fecthData()
  },[])
  return (
    <div className='bg-cuartiaryColor flex justify-center'>
      <div className='w-11/12 bg-white mt-2 min-h-dvh rounded-t-3xl shadow-2xl p-8'>
        <div className='flex justify-center'>
          <h1 className='text-3xl font-bold'>Resultado de Votaciones</h1>
        </div>
        <div className='flex gap-8 bg-cuartiaryColor rounded-3xl'>
          <div className='w-[50%]'>
            <Graph dataCan={dataCan}/>
          </div>
          <div className='w-[50%] justify-center flex flex-col mr-2'>
           {              
              dataCan && dataCan.map((candidate, index)=>{
                let porcentage= 0;

                if(candidate.votes > 0){
                  porcentage = (candidate.votes / totalVotes) * 100;
                }

                return(
                  <div className='flex w-full items-center bg-white p-4 mb-2 rounded-xl' key={index}>
                    <Image src={candidate.image} alt={`perfil${candidate.name}`} width={100} height={50} className='rounded-full' />
                    <div className='flex flex-col w-full mr-4 items-center'>
                      <p>{candidate.name}</p>
                      <div className={`w-full bg-blue-200 rounded-full dark:bg-gray-700 ml-4 h-4`}>
                        <div style={{ backgroundColor:candidate.borderColor }} 
                        className={` text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full w-[${porcentage}%]`}
                        > {candidate.votes} </div>
                      </div>
                    </div>
                  </div>
                )
              })
            } 
          </div>
        </div>
      </div>
    </div>
  )
}


// export default Results

'use client'
import React, { useEffect, useState } from 'react'
import Graph from '../graph/Graph'
import Image from 'next/image'
import { getCampañaByID } from '@/helpers/campaña.helper'
import { IDataVote, IVotesResult } from '@/interfaces/IVotesResult'
import colors from '@/helpers/colors.helper'

const Results = () => {

  const[candidates, setCandidates] = useState<IVotesResult[]>([])
  const [dataCan, setDataCan] = useState<IDataVote[]>([])
  const [totalVotes, setTotalVotes] = useState<number> (0)

  const fetchData = async ()=>{
    try {
      const datas = await getCampañaByID()

      if(datas){
        datas.map((data, index)=>{

          
          if(data.candidate){
            const obj= {
              name: "",
              votes: 5,
              image: data.candidate.imgUrl,
              backgroundColor: colors.backgroundColor[index],
              borderColor: colors.borderColor[index],
          }
            
          setTotalVotes(prev=> prev + data.votes)
          
          setDataCan(prev => [
            ...prev,
            obj
          ])}
        })
      } 
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=>{
    fetchData()
  },[])
  return (
    <div className='bg-cuartiaryColor flex justify-center'>
      <div className='w-11/12 bg-white mt-2 min-h-dvh rounded-t-3xl shadow-2xl p-8'>
        <div className='flex justify-center'>
          <h1 className='text-3xl font-bold'>Resultado de Votaciones</h1>
        </div>
        <div className='flex gap-8 bg-cuartiaryColor rounded-3xl'>
          <div className='w-[50%]'>
            <Graph/>
          </div>
          <div className='w-[50%] justify-center flex flex-col mr-2'>
           {              
              dataCan && dataCan.map((candidate, index)=>{
            
                return(
                  <div className='flex w-full items-center'>
                    <Image src="/images/busto.png" alt="" width={100} height={50} />
                    <div className='flex flex-col w-full mr-4 items-center'>
                      <p>Nombre</p>
                      <div className={`w-full bg-white rounded-full dark:bg-gray-700 ml-4 h-4`}>
                        <div style={{ backgroundColor:candidate.borderColor }} className={` text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full w-[${totalVotes}%]`}> {candidate.votes} </div>
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

export default Results

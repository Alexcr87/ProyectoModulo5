/*'use client'
import React, { useEffect, useState } from 'react'
import Graph from '../graph/Graph'
import Image from 'next/image'
import { getCampañaByID } from '@/helpers/campaña.helper'
import ICampaign from '@/interfaces/ICampaign'
import colors from '@/helpers/colors.helper'
import { IVotosResult } from '@/helpers/campaña.helper'

const Results = () => {

  const[candidates, setCandidates] = useState<IVotosResult[]>([])
  const [campaña, setCampaña] = useState<ICampaign>()

  const fetchData = async ()=>{
    try {
      const data = await getCampañaByID()
      setCampaña(data)
      const candidatesCampaña = data.candidates

      if(candidatesCampaña){
        candidatesCampaña.map((data, index)=>{
          if(data.user){
          const obj:IVotosResult = {
            name: data.user?.name,
            votes: 0,
            image: "",
            backgroundColor: colors.backgroundColor[index],
            borderColor: colors.borderColor[index]
          }
          
          setCandidates(prev => [
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
              candidates && candidates.map((candidate)=>{
                return(
                  <div className='flex w-full items-center'>
                    <Image src="/images/busto.png" alt="" width={100} height={50} />
                    <div className='flex flex-col w-full mr-4 items-center'>
                      <p>{candidate.name}</p>
                      <div className={`w-full bg-white rounded-full dark:bg-gray-700 ml-4 h-4`}>
                        <div style={{ backgroundColor: candidate.borderColor }} className={` text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full w-[45%]`}> 150 </div>
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

export default Results*/

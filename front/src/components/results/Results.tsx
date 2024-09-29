import React from 'react'
import Graph from '../graph/Graph'
import Image from 'next/image'

const Results = () => {
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
            <div className='flex w-full items-center'>
              <Image src="/images/busto.png" alt="" width={100} height={50} />
              <div className='flex flex-col w-full mr-4 items-center'>
                <p>Simon</p>
                <div className="w-full bg-white rounded-full dark:bg-gray-700 ml-4 h-4">
                  <div className="bg-[#ffce56] text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full w-[45%]"> 150 </div>
                </div>
              </div>
            </div>
            <div className='flex w-full items-center'>
              <Image src="/images/busto.png" alt="" width={100} height={50} />
              <div className='flex flex-col w-full mr-4 items-center'>
                <p>Juan</p>
              <div className="w-full bg-white rounded-full dark:bg-gray-700 ml-4 h-4">
                <div className="bg-[#ff6384] text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full w-[25%]"> 10</div>
              </div>
              </div>
            </div>
            <div className='flex w-full items-center'>
              <Image src="/images/busto.png" alt="" width={100} height={50} />
              <div className='flex flex-col w-full mr-4 items-center'>
                <p>Pedro</p>
              <div className="w-full bg-white rounded-full dark:bg-gray-700 ml-4 h-4">
                <div className="bg-[#36a2eb] text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full w-[80%]"> 200</div>
              </div>
              </div>
            </div>
            <div className='flex w-full items-center'>
              <Image src="/images/busto.png" alt="" width={100} height={50} />
              <div className='flex flex-col w-full mr-4 items-center'>
                <p>En blanco</p>
              <div className="w-full bg-white rounded-full dark:bg-gray-700 ml-4 h-4">
                <div className="bg-[#4bc0c0] text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full w-[10%]"> 5</div>
              </div>
              </div>
            </div>
          </div>
        </div>
          
            
      </div>
    </div>
  )
}

export default Results

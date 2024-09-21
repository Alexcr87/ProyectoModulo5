import CandidateDetails from '@/components/cadidateDetails/CandidateDetails'
import { getCandidatesByID } from '@/helpers/candidate.helper'
import React from 'react'

const candidateDetails: React.FC <{params:{id:string}}> = async ({params}) => {
    const candidate = await getCandidatesByID(params.id)
  return (
    <div className='bg-cuartiaryColor h-full flex flex-col items-center'>
      <CandidateDetails {...candidate}/>
    </div>
  )
}

export default candidateDetails

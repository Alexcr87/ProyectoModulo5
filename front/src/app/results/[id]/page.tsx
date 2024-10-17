import Results from '@/components/results/Results'
import { getCampañaByID } from '@/helpers/campaña.helper'
import { IVotesResult } from '@/interfaces/IVotesResult'
import React from 'react'

const ResultCampaña: React.FC<{ params: { id: string } }> = async ({ params }) => {
    const data:IVotesResult[] = await getCampañaByID(params.id)
  return (
    <Results data={data} id={params.id} />
  )
}

export default ResultCampaña

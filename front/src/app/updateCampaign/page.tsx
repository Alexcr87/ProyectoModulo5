import UpdateCampaign from "@/components/updateCampaign/updateCampaign";

import { Suspense } from 'react';

const pageupdateCampaign = () => {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
    <UpdateCampaign/>
    </Suspense>
  )
}
export default pageupdateCampaign
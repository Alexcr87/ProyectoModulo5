import UpdateCampaing from "@/components/updateCampaing/updateCampaing";

import { Suspense } from 'react';

const pageupdateCampaing = () => {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
    <UpdateCampaing/>
    </Suspense>
  )
}
export default pageupdateCampaing
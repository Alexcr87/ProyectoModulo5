"use client"
import UpdateCampaign from "@/components/updateCampaign/updateCampaign";
import { useAuth } from "@/context/Authontext";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from 'react';
import NotFound from "../not-found";

const pageupdateCampaign = () => {
  const { userData } = useAuth();
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const roles = userData?.userData?.roles?.map((item) => item.id);
    if (!roles || !roles.includes(4)) {
      router.push("/login");
    } else {
      setIsVerified(true); // Permitir que el componente se renderice
    }
  }, [userData, router]);

  if (!isVerified) {
    return (NotFound())// Mostrar nada mientras se verifica
  }
  return (
    <Suspense fallback={<div>Cargando...</div>}>
    <UpdateCampaign/>
    </Suspense>
  )
}
export default pageupdateCampaign
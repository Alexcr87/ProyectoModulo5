"use client"
import Campaigndesc from "@/components/Campaigndesc/campaingdesc";
import { useAuth } from "@/context/Authontext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NotFound from "../not-found";

const CampaigndescPage=()=>{
    const { userData } = useAuth();
    const router = useRouter();
    const [isVerified, setIsVerified] = useState(false);
  
    useEffect(() => {
      
      if (!userData?.token) {
        router.push("/login");
      } else {
        setIsVerified(true); // Permitir que el componente se renderice
      }
    }, [userData, router]);
  
    if (!isVerified) {
      return (NotFound())// Mostrar nada mientras se verifica
    }


    return(
        <div className="bg-cuartiaryColor h-full flex justify-center">
            <div className="bg-white w-11/12 mt-4 rounded-t-2xl p-8 drop-shadow-2xl border-2" >
                <Campaigndesc/>
            </div>
        </div>
    )
};
export default CampaigndescPage
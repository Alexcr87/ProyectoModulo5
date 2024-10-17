"use client"
import PerfilMadreComponent from "@/components/perfilMadreUserCandidate/perilMadreUserCandidate";
import { useAuth } from "@/context/Authontext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NotFound from "../not-found";


const PerfilMadre =()=>{
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
      <div className=" h-full flex justify-center">
         <PerfilMadreComponent/>
        </div>
    )
};
export default PerfilMadre
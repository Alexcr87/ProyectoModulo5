"use client"
import RegisterByAuth0 from "@/components/Register/registerByAuth0";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NotFound from "../not-found";


const RegisterAuth0=()=>{
    const {user} =useUser()
    const router =useRouter()
    const [isVerified, setIsVerified] = useState(false);
    
    useEffect(() => {
      
        if (!user) {
          router.push("/login");
        } else {
          setIsVerified(true); // Permitir que el componente se renderice
        }
      }, [user, router]);
    
      if (!isVerified) {
        return (NotFound())// Mostrar nada mientras se verifica
      }


    
    return(
        <div className="bg-cuartiaryColor h-full flex justify-center">

        <div className="bg-white w-11/12 mt-4 rounded-t-2xl p-8 drop-shadow-2xl border-2" >
         <RegisterByAuth0/>
        </div>
        </div>
    )
};
export default RegisterAuth0
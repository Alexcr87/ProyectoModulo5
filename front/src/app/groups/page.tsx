"use client"
import Groups from "@/components/Groups/groups";
import { useAuth } from "@/context/Authontext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NotFound from "../not-found";

const GroupsPage=()=>{
    const { userData } = useAuth();
    const router = useRouter();
    const [isVerified, setIsVerified] = useState(false);
  
    useEffect(() => {
      const roles = userData?.userData?.roles?.map((item) => item.id);
      if (!roles || (!roles.includes(1) && !roles.includes(4))) {
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
                <Groups/>
            </div>
        </div>
    )
};
export default GroupsPage
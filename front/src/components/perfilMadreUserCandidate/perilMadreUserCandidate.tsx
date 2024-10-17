"use client";

import { useAuth } from "@/context/Authontext";
import UpdateCandidate from "../updateCandidate/updateCandidate";
import VoterProfile from "../perfilUser/perfilUser";

const PerfilMadreComponent = () =>{
  const { userData, setUserData } = useAuth();


  const userRoles = userData?.userData.roles.map(item => item.id)
  const isCandidate = userRoles?.includes(2)

  return(
    <>
          <div className="w-full">
            <VoterProfile/>
            {isCandidate && <UpdateCandidate />}
          </div>
    </>
  )
}
export default PerfilMadreComponent
import { useAuth } from "@/context/Authontext";
import { useEffect, useState } from "react";
import CustomModal from "../InstructionsModal/Modal";


const rolesMapping: {[key: string]: string } ={
    1: 'admin',
    2: 'candidate',
    3: 'voter',
    4: 'moderator',
};
const Guia = ()=>{
    const { userData }= useAuth();
    const [modalIsOpen, setModalIsOpen]= useState(false);
    const [userRole, setUserRole]= useState<string | null>(null);
    useEffect(() =>{
        const roles = userData?.userData.roles.map((item: { id:number}) => item.id) || [];
        const role =roles.find((roleId)=> rolesMapping[String(roleId)]);
        if (role) {
            setUserRole(rolesMapping[String(role)]);
          } else {
            setUserRole(null);
          }
          console.log('Rol del usuario:', rolesMapping[String(role)]);
    },[userData]);
    const openModal = ()=>{
        setModalIsOpen(true);
    };
    const closeModal=()=>{
        setModalIsOpen(false);
    };
    return (
        <div>
            <div>
                <button onClick={openModal}>
                    <img
                    src='/images/help.png'
                    alt='Help Icon'
                    className="w-6 h-6 mr-2"
                    />
                </button>
                <CustomModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                userRole={userRole}
                />
            </div>
        </div>
    );
};
export default Guia;



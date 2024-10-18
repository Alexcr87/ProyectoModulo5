import { useAuth } from "@/context/Authontext";
import { useEffect, useState } from "react";
import CustomModal from "../InstructionsModal/Modal";
import '@fortawesome/fontawesome-free/css/all.min.css';


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
    },[userData]);
    const openModal = ()=>{
        setModalIsOpen(true);
    };
    const closeModal=()=>{
        setModalIsOpen(false);
    };
    return (
        <div>
            <div className="mr-8">
                <button onClick={openModal}>
                <i className="fa-solid fa-question"></i>
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



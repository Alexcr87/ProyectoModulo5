'use client'
import React, { useEffect, useState } from "react";
import Boton from "../boton/Boton";
import Image from "next/image";
import { IRegisterCandidate, IRegisterCandidateError, IRegisterCandidateProps } from "./TypesRegisterCandidate";
import { ValidateFormCandidate } from "@/helpers/validateRegisterCandidate";4
import { IloginProps } from "@/interfaces/ILogin";
import { usePathname } from "next/navigation";
import { registerCandidate } from "@/helpers/candidate.helper";

const RegisterCandidate = () => {
    const initialState = {
        postulation: "",
        list: "",
        campaignDescription: "",
        proposals: "",
        file:""
    }
    const initialState2 = {
        postulation: "",
        list: "",
        campaignDescription: "",
        proposals: [],
        file:null,
        userId:""
    }

    const [dataCandidate, setDataCandidate] = useState<IRegisterCandidateProps>(initialState)
    const [errorCandidate, setErrorCandidate] = useState<IRegisterCandidateError>(initialState)
    const [proposalOther, setProposalOther] = useState<IRegisterCandidate>(initialState2)
    const [isDisabled, setIsDisabled] = useState(true)
    const [userSesion, setUserSesion] = useState<IloginProps>()
    const [file, setFile] = useState<File | null>(null)

    const pathname = usePathname()

    useEffect(() => {
        const localUser = localStorage.getItem("userSesion")
        setUserSesion(JSON.parse(localUser!));
    },[pathname])

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const selectedFile = event.target.files?.[0] || null;
        setFile(selectedFile);
    }

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
        const {name, value} = event.target;
       setDataCandidate({
            ...dataCandidate,
            [name]: value
        }) 

    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        
        const obj: IRegisterCandidate = {
          postulation: dataCandidate.postulation,
          list: dataCandidate.list,
          campaignDescription: dataCandidate.campaignDescription,
          proposals: proposalOther.proposals,
          file: file,
          userId: userSesion?.result?.id
        }
        console.log(obj);
        
        await registerCandidate(obj)
        
    }
    //funcion para ir cargando las propuestas antes de enviar el formulario
    const handleAddProporsal = ()=>{
        const newProposal = [...proposalOther.proposals, dataCandidate.proposals]

        setProposalOther((prev)=>({
            ...prev,
            proposals: newProposal,
        }))

        setDataCandidate((prev)=>({
            ...prev,
            proposals: ""
        }))
    }

    useEffect(()=>{
        const errors = ValidateFormCandidate(dataCandidate)
        setErrorCandidate(errors)
        //verifica los campos requeridos para habilitar el boton de submit
        const allFilled = Object.values(dataCandidate).every(field => field.trim() !== '');
        setIsDisabled(!allFilled)
    },[dataCandidate])

  return (
    <div className="flex flex-col items-center">
      <div className="col-start-5 col-end-9 mt-[2.5em] text-center text-xl">
        <h1>REGISTRO DE CANDIDATOS</h1>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 justify-center w-8/12 mt-8 gap-16">
        <div className="flex flex-col gap-4">
          <input
            id="postulation"
            name="postulation"
            type="text"
            value={dataCandidate.postulation}
            onChange={handleChange}
            placeholder="Postulacion"
            className="border rounded-full bg-secundaryColor text-black placeholder:text-black text-left p-2 pl-3 mt-1 outline-none focus:border-tertiaryColor shadow-xl hover:scale-105"
            required
          />
          <input
            id="list"
            name="list"
            type="text"
            value={dataCandidate.list}
            onChange={handleChange}
            placeholder="Lista"
            className="border rounded-full bg-secundaryColor text-black placeholder:text-black text-left p-2 pl-3 mt-1 outline-none focus:border-tertiaryColor shadow-xl hover:scale-105"
            required
          />
          <input 
            type="file" 
            value={dataCandidate.file}
            onChange={handleFileChange}
        />
          <textarea
            id="campaignDescription"
            name="campaignDescription"
            value={dataCandidate.campaignDescription}
            onChange={handleChange}
            placeholder="Descripcion de la campaña"
            className="border rounded-lg bg-secundaryColor h-40 text-black placeholder:text-black text-left p-2 pl-3 mt-1 outline-none focus:border-tertiaryColor shadow-xl hover:scale-105"
            required
          />
        </div>
        <div className="flex flex-col gap-4">
        <textarea
            id="proposals"
            name="proposals"
            value={dataCandidate.proposals}
            onChange={handleChange}
            placeholder={`Propuestas: ${proposalOther.proposals.length}`}
            className="border rounded-lg bg-secundaryColor h-40 text-black placeholder:text-black text-left p-2 pl-3 mt-1 outline-none focus:border-tertiaryColor shadow-xl hover:scale-105"
          />
        <Boton text="Agregar Propuesta" type="button" onClick={handleAddProporsal}/>
        <div className="flex justify-between">
            <Image src="/images/registerImage.png" alt="" width={200} height={200}/>
            <div className="self-center">
                {
                  !isDisabled ? (
                      <div className="opacity-40">
                          <Boton text="REGISTRAR" type="button"/> 
                      </div>
                  ): <Boton text="REGISTRAR" type="submit"/>
                }
            </div>
        </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterCandidate;

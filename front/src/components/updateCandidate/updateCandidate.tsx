'use client';
import { useEffect, useState } from "react";
import Boton from "../ui/Boton";
import Input from "../ui/Input";
import InputFile from "../ui/InputFile";
import Textarea from "../ui/Textarea";
import Select from "../ui/Select";
import { useRouter } from "next/router";
import { Tooltip } from 'react-tooltip';
import Swal from "sweetalert2";
import ICandidate from "@/interfaces/ICandidate";


const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

const UpdateCandidate = () =>  {

  //  const userId = id
  const [postulation, setPostulation] = useState<string>("");
  const [list, setList] = useState<string>("");
  const [campaignDescription, setCampaignDescription] = useState<string>("");
  const [proposals, setProposals] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [candidate, setCandidates] = useState<ICandidate[]> ([]) 
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [candidateFinally, setCandidatesFinally] = useState<ICandidate> () 


  
  useEffect(() => {
    const fetchCampaigns = async () => {
      const localUser = localStorage.getItem("userSession")
      const localUserParsed = JSON.parse(localUser!);
      const actualUserId = localUserParsed.userData.id
      setSelectedCandidateId(actualUserId)
  
      
      try {
        const response = await fetch(`${APIURL}/candidates`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
        const data = await response.json();
        console.log (data)
        setCandidates(data); 
        
      if (candidate.length > 0) {
        const candidatoEncontrado = candidate?.find(item => item.user.id === selectedCandidateId);
        console.log (candidatoEncontrado)
        setCandidatesFinally(candidatoEncontrado)
  
      }
      } catch (error) {
        console.error("Error al cargar campañas:", error);
      }
    };

    fetchCampaigns();
  }, [candidate]);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  const handleProposalsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setProposals(value.split("\n"));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData();
    formData.append("postulation", postulation);
    formData.append("list", list);
    formData.append("campaignDescription", campaignDescription);
    formData.append("proposals", JSON.stringify(proposals));
    // formData.append("userId", selectedCandidateId!); 
  
    if (file) {
      formData.append("file", file);
    }
  
    try {
      if (!candidateFinally?.id) {
        console.log (candidateFinally)
        throw new Error("El candidato no está seleccionado o no tiene un ID válido.");
        
      }
  
      const response = await fetch(`${APIURL}/candidates/${candidateFinally?.id}`, {
        method: "PATCH",
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar el candidato");
      }
  
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Candidato actualizado exitosamente.',
      }).then(() => {
        // window.location.href = `/perfilUser`;
      });
  
    } catch (error) {
      console.error(error); // Agregar esto para ver el error en la consola
      if (error instanceof Error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        }).then(() => {
          // window.location.href = `/perfilUser`;
        });
      }
    } finally {
      setLoading(false); 
    }
  };


return (
  <div className="flex w-[50%] justify-center items-center p-6 bg-white shadow-lg rounded-lg m-auto mt-10">
    <form className="w-11/12 space-y-4" onSubmit={handleSubmit}>
      <h1 className="text-lg font-bold text-center">Actualizar Candidato</h1>
      
      {/* Postulación */}
      <div className="relative">
        <label className="flex items-center">
          Postulación
          <span className="ml-2 text-blue-500 cursor-pointer" data-tooltip-id="tooltip-postulation">ℹ️</span>
          <Tooltip id="tooltip-postulation" place="top" content="Introduce el nombre de la postulación." />
        </label>
        <Input type="text" placeholder="Postulación" required />
      </div>

      {/* Lista */}
      <div className="relative">
        <label className="flex items-center">
          Lista
          <span className="ml-2 text-blue-500 cursor-pointer" data-tooltip-id="tooltip-list">ℹ️</span>
          <Tooltip id="tooltip-list" place="top" content="Indica la lista a la que pertenece el candidato." />
        </label>
        <Input type="text" placeholder="Lista" required />
      </div>

      {/* Descripción de la campaña */}
      <div className="relative">
        <label className="flex items-center">
          Descripción de la campaña
          <span className="ml-2 text-blue-500 cursor-pointer" data-tooltip-id="tooltip-campaign-description">ℹ️</span>
          <Tooltip id="tooltip-campaign-description" place="top" content="Proporciona una breve descripción de la campaña." />
        </label>
        <Textarea placeholder="Descripción de la campaña" required />
      </div>

      {/* Propuestas */}
      <div className="rounded-md">
        <label className="block text-sm font-medium text-gray-700">
          Propuestas
          <span className="ml-2 text-blue-500 cursor-pointer" data-tooltip-id="tooltip-proposals">ℹ️</span>
          <Tooltip id="tooltip-proposals" place="top" content="Escribe cada propuesta en una nueva línea." />
        </label>
        <Textarea placeholder="Escribe cada propuesta en una nueva línea" />
      </div>

      {/* Campaña */}
      {/* <div className="rounded-md">
        <label className="block text-sm font-medium text-gray-700">
          Campaña
          <span className="ml-2 text-blue-500 cursor-pointer" data-tooltip-id="tooltip-campaign">ℹ️</span>
          <Tooltip id="tooltip-campaign" place="top" content="Selecciona la campaña correspondiente." />
        </label>
        <Select required>
          <option value="">Seleccione una campaña</option>
        </Select>
      </div> */}

      {/* Imagen del candidato */}
      <div className="rounded-md">
        <label className="block text-sm font-medium text-gray-700">
          Imagen del candidato (JPG)
          <span className="ml-2 text-blue-500 cursor-pointer" data-tooltip-id="tooltip-candidate-image">ℹ️</span>
          <Tooltip id="tooltip-candidate-image" place="top" content="Sube una imagen del candidato en formato JPG." />
        </label>
        <InputFile type="file" accept="image/jpeg" />
      </div>

      {/* Botón de actualización */}
      <div className="flex justify-center">
        <div className="w-[40%]">
          <Boton>Actualizar Candidato</Boton>
        </div>
      </div>
    </form>

    {/* Imagen del candidato a la derecha */}
    <div className="flex justify-center items-center ml-6">

      {/* {candidateFinally ? (

        <img 
          className="h-60 w-72"
          src={candidateFinally.imgUrl} 
          alt={`imagen del candidato ${candidateFinally.imgUrl}`} 
        />
      ) : (
        <p>Cargando imagen del candidato...</p>
      )} */}
{candidateFinally && candidateFinally.imgUrl ? (
  <img 
    className="h-60 w-72"
    src={candidateFinally.imgUrl} 
    alt={`imagen del candidato ${candidateFinally.imgUrl}`} 
  />
) : (
  <p>Cargando imagen del candidato...</p>
)}
    </div>
  </div>
);

};
export default UpdateCandidate;
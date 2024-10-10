'use client';
import { useEffect, useState } from "react";
import Boton from "../ui/Boton";
import Input from "../ui/Input";
import InputFile from "../ui/InputFile";
import Textarea from "../ui/Textarea";
import Select from "../ui/Select";
import { useRouter } from "next/router";
import { useSearchParams } from 'next/navigation'
import Swal from "sweetalert2";
import ICandidate from "@/interfaces/ICandidate";
import IUserUpdate from "@/interfaces/IuserUpdate";


const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

const updateCandidate = () =>  {

  const [postulation, setPostulation] = useState<string>("");
  const [list, setList] = useState<string>("");
  const [proposals, setProposals] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<IUserUpdate | null>(null);
  const [error, setError] = useState<string | null>(null);

const searchParams = useSearchParams(); // Obtener parámetros de la URL
const id = searchParams.get('id'); // Obtener el id


useEffect(() => {
  if (id) {
    fetch(`${APIURL}/user/${id}`)
      .then(response => response.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }
}, [id]);

console.log (user)
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
  formData.append("proposals", JSON.stringify(proposals));
  if (file) {
    formData.append("file", file);
  }
  try {
    const response = await fetch(`${APIURL}/candidates/${user?.candidate?.id}`, {
      method: "PATCH",
      body: formData,
    });
    if (!response.ok) {
      const errorData = await response.json();
      
      throw new Error( errorData.message || "Error en la actualizacion del candidato");
    }
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Candidato Actualizado exitosamente.',
    }).then(() => {
      window.location.href = "/candidates";
    });
  
  } catch (error) {
    if (error instanceof Error) {
      
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      });
    }
  } finally {
    setLoading(false); 
  }
};


  return (
     <div className="flex w-[50%] justify-center p-6 bg-white shadow-lg rounded-lg m-auto">
      
      <form  className="w-11/12 space-y-4" onSubmit={handleSubmit}>
        <h1 className="text-lg font-bold text-center">Actualizar Candidato</h1>

        <div className="flex flex-row items-center w-full  gap-4 m-auto mt-8 py-4 px-4 font-bold border-4 rounded-md outline-none
            border-stroke dark:border-dark-3 border-blue-500" >

          {user && (
  <p className="w-full">{`Candidato: ${user.name}`}</p>
)}
 {!user && (
  <p>Cargando...</p> // o algún otro indicador de carga
)}
        
      </div>
      <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-60">
          <img
            className="h-60 w-72 m-auto"
            src={user?.candidate?.imgUrl}
            alt={`imagen del candidato ${user?.candidate?.imgUrl}`}
          />
        </div>
          <Input
            type="text"
            placeholder="Postulación"
            value={postulation}
            onChange={(e) => setPostulation(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Lista"
            value={list}
            onChange={(e) => setList(e.target.value)}
            required
          />
        <div className="rounded-md">
          <label className="block text-sm font-medium text-gray-700">Propuestas</label>
          <Textarea
            value={proposals.join("\n")}
            onChange={handleProposalsChange}
            placeholder="Escribe cada propuesta en una nueva línea"
          />
        </div>
        <div className="rounded-md">
          <label className="block text-sm font-medium text-gray-700">Campaña</label>
        </div>
        <div className="rounded-md">
          <label className="block text-sm font-medium text-gray-700">Imagen del candidato (JPG)</label>
          <InputFile
            type="file"
            accept="image/jpeg"
            onChange={handleFileChange}
          />
        </div>
        <div className="flex justify-center">
          <div className="w-[40%]">
            <Boton> Actualizar Candidato </Boton>
          </div>
         </div>
      </form>
    </div>
  );
};
export default updateCandidate;
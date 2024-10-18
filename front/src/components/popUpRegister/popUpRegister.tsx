"use client";

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Boton from "../ui/Boton";
import InputFile from "../ui/InputFile";
import { importUser } from "@/helpers/auth.helper";
import Register from "../Register/register";
import { useAuth } from '@/context/Authontext'
import Select from "react-select";
import IGroup from "@/interfaces/IGroup";
import { useRouter } from 'next/navigation'
import BotonExcel from "../ui/BotonExcel";

const PopUpRegisterComponent = ({ registroManual, registroMasivo}: { registroManual: boolean, registroMasivo: boolean  }) => {
  // const [registroManual, setRegistroManual] = useState(false);
  // const [registroMasivo, setRegistroMasivo] = useState(false);
 const router = useRouter()
  const [file, setFile] = useState<File | null>(null);
  const { userData, setUserData } = useAuth();
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<IGroup[]>([]);
  const [loading, setLoading] = useState(false)

  const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;
  const parentId = userData?.userData.id

  useEffect(() => {
    fetchGroups();
  }, [parentId]);

  const fetchGroups = async () => {
    if (parentId) {
      try {
        const response = await fetch(`${APIURL}/groups/user/${parentId}`)
        const data = await response.json();
        setGroups(data);
      } catch (error) {
        console.error('Error fetching groups:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al obtener los grupos',
          text: 'Hubo un problema al cargar los grupos. Intente nuevamente.',
        });
      }
    }
  };


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, selecciona un archivo.",
      });
      return;
    }
  
    setLoading(true);
  
    try {
      // Lógica de importación de usuarios, ahora recibe la respuesta con addedUsers, errors y existingUsers
      const response = await importUser(file, userData?.userData.id, selectedGroups);
  
      const { addedUsers, errors, existingUsers } = response;
  
      // Si hay usuarios agregados
      if (addedUsers.length > 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${addedUsers.length} usuarios añadidos con éxito`,
          showConfirmButton: true,
        });
      }
  
      // Si hay usuarios existentes
      if (existingUsers.length > 0) {
        Swal.fire({
          position: "center",
          icon: "info",
          title: "Usuarios ya registrados",
          text: `Los siguientes usuarios ya están registrados: ${existingUsers.join(', ')}. Por favor, gestiona estos usuarios en "Mis usuarios" para agregarlos o cambiarlos de grupo.`,
          showConfirmButton: true,
        });
      }
  
      // Si hay errores
      if (errors.length > 0) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Errores durante la carga",
          text: `Hubo errores con los siguientes usuarios: ${errors.join(', ')}`,
          showConfirmButton: true,
        });
      }
  
      // Redirigir o hacer alguna acción adicional si todo es exitoso
      if (addedUsers.length > 0) {
        router.push('/users');
      }
  
    } catch (error: any) {
      const errorMessage = (error.message) || "Error desconocido al subir el archivo.";
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error al subir el archivo",
        text: errorMessage,
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMultiSelectChange = (selectedOptions: any) => {
    const selectedGroups = selectedOptions.map((option: any) => ({ id: option.value, name: option.label }));
    setSelectedGroups(
      selectedGroups
    );
  };

  const handleDownloadExcel = () => {
    const link = document.createElement("a");
    link.href = `${window.location.origin}/images/ExcelDeMuestra.xlsx`;
    link.download = "ExcelDeMuestra.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* <button
        onClick={() => setRegistroManual(true)}
        className="bg-blue-500 text-white px-4 py-2 m-2 rounded"
      >
       Registro Manual
      </button>
      <button
        onClick={() => setRegistroMasivo(true)}
        className="bg-green-500 text-white px-4 py-2 m-2 rounded"
      >
        Registro Masivo
      </button> */}

      {/* Popup para registro manual */}
      {registroManual && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white mt-28 md:mt-0 md:p-8 rounded-lg shadow-lg relative overflow-hidden">
            <button
              // onClick={() => setRegistroManual(false)}
              onClick={() => router.push('/')} 
              className="bg-primaryColor text-white px-4 py-2 m-2 rounded">
              x
            </button>
            <Register />
          </div>
        </div>
      )}

      {/* Popup para registro masivo */}
      {registroMasivo && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 w-[90%] md:w-[40%] rounded-lg shadow-lg relative overflow-hidden flex flex-col items-center">
            <button
              onClick={() => router.push('/')} 
              className="absolute top-2 left-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
            >
              x
            </button>
            <h2 className="text-xl mb-4 font-bold">Subir y Descargar Excel</h2>
            <p>1º- Descargar la plantilla de excel donde agregaras los usuarios</p>
            <span className="text-red-500">Nota: no agregar ni quitar columnas de la plantilla</span>
            <div className="flex justify-between my-4">
              <Boton onClick={handleDownloadExcel}>Descargar Excel</Boton>
            </div>
            <p className="mb-4">2º- Seleciona la plantilla descargada con el listado de usuarios a agregar</p>
            <InputFile type="file" onChange={handleFileChange} />
            <p className="my-4">3º- Seleciona el grupo o los grupos a los que perteneceran estos usuarios</p>
            <div className="flex flex-col w-full">
            <Select
              isMulti
              name="groups"
              options={groups.map(group => ({ value: group.id, label: group.name }))}
              className="basic-multi-select w-full"
              classNamePrefix="select"
              onChange={handleMultiSelectChange}
              placeholder='Selecciona grupos'
            />
            </div>
            <div className="flex justify-between mt-4">
              <BotonExcel onClick={handleUpload} loading={loading}disabled={loading} >Subir Excel</BotonExcel>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopUpRegisterComponent;

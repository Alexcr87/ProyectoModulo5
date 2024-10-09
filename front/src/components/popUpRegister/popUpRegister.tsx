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

const PopUpRegisterComponent = () => {
  const [registroManual, setRegistroManual] = useState(false);
  const [registroMasivo, setRegistroMasivo] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { userData, setUserData } = useAuth();
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<IGroup[]>([]);

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

    try {
      // Implementa la lógica de importación del archivo aquí
    await importUser(file, userData?.userData.id, selectedGroups); // Asegúrate de definir esta función
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Archivo subido con éxito",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error:any) {
     const errorMessage = (error.message) || "Error desconocido al subir el archivo.";
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error al subir el archivo",
        text:errorMessage,
        showConfirmButton: false,
        timer: 1500,
      });
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
      <button
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
      </button>

      {/* Popup para registro manual */}
      {registroManual && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <button onClick={() => setRegistroManual(false)} className="mb-4">
              Cerrar
            </button>
            <h2 className="text-xl mb-4">Formulario de Registro</h2>
            <Register />
          </div>
        </div>
      )}

      {/* Popup para registro masivo */}
      {registroMasivo && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <button onClick={() => setRegistroMasivo(false)} className="mb-4">
              Cerrar
            </button>
            <h2 className="text-xl mb-4">Subir y Descargar Excel</h2>
            <InputFile type="file" onChange={handleFileChange} />
            <div className="flex flex-col mt-4">
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
              <Boton onClick={handleUpload}>Subir Excel</Boton>
              <Boton onClick={handleDownloadExcel}>Descargar Excel</Boton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopUpRegisterComponent;

'use client';
import { useEffect, useState } from "react";
import Boton from "../ui/Boton";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import InputFile from "../ui/InputFile";
import Swal from "sweetalert2";
import ICandidate from "@/interfaces/ICandidate";
import { Tooltip } from 'react-tooltip';

const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

const UpdateCandidate = () => {
  const [postulation, setPostulation] = useState<string>("");
  const [list, setList] = useState<string>("");
  const [campaignDescription, setCampaignDescription] = useState<string>("");
  const [proposals, setProposals] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [candidate, setCandidates] = useState<ICandidate[]>([]);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [candidateFinally, setCandidateFinally] = useState<ICandidate>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);


  useEffect(() => {
    const fetchCandidates = async () => {
      const localUser = localStorage.getItem("userSession");
      const localUserParsed = JSON.parse(localUser!);
      const actualUserId = localUserParsed.userData.id;
      setSelectedCandidateId(actualUserId);

      try {
        const response = await fetch(`${APIURL}/candidates`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        setCandidates(data);
      } catch (error) {
        console.error("Error al cargar candidatos:", error);
      }
    };

    fetchCandidates();
  }, []);

  useEffect(() => {
    if (candidate.length > 0 && selectedCandidateId) {
      const foundCandidate = candidate.find(item => item.user.id === selectedCandidateId);
      setCandidateFinally(foundCandidate);
    }
  }, [candidate, selectedCandidateId]);

  const handleProposalsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setProposals(value.split("\n"));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    
    if (selectedFile) {
      const fileUrl = URL.createObjectURL(selectedFile); // Crear URL del archivo
      setImagePreview(fileUrl); // Actualizar el estado de la imagen
    } else {
      setImagePreview(null); // Limpiar el estado si no hay archivo
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("postulation", postulation);
    formData.append("list", list);
    formData.append("campaignDescription", campaignDescription);
    formData.append("proposals", JSON.stringify(proposals));

    if (file) {
      formData.append("file", file);
    }

    try {
      if (!candidateFinally?.id) {
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
          <Input
            id="postulation"
            name="postulation"
            type="text"
            value={postulation}
            onChange={(e) => setPostulation(e.target.value)}
            placeholder="Postulación"
            required
          />
        </div>

        {/* Lista */}
        <div className="relative">
          <label className="flex items-center">
            Lista
            <span className="ml-2 text-blue-500 cursor-pointer" data-tooltip-id="tooltip-list">ℹ️</span>
            <Tooltip id="tooltip-list" place="top" content="Indica la lista a la que pertenece el candidato." />
          </label>
          <Input
            id="list"
            name="list"
            type="text"
            value={list}
            onChange={(e) => setList(e.target.value)}
            placeholder="Lista"
            required
          />
        </div>

        {/* Propuestas */}
        <div className="rounded-md">
          <label className="block text-sm font-medium text-gray-700">
            Propuestas
            <span className="ml-2 text-blue-500 cursor-pointer" data-tooltip-id="tooltip-proposals">ℹ️</span>
            <Tooltip id="tooltip-proposals" place="top" content="Escribe cada propuesta en una nueva línea." />
          </label>
          <Textarea
            value={proposals.join("\n")}
            onChange={handleProposalsChange}
            placeholder="Escribe cada propuesta en una nueva línea"
          />
        </div>

        {/* Imagen del candidato */}
        <div className="rounded-md">
          <label className="block text-sm font-medium text-gray-700">
            Imagen del candidato (JPG)
            <span className="ml-2 text-blue-500 cursor-pointer" data-tooltip-id="tooltip-candidate-image">ℹ️</span>
            <Tooltip id="tooltip-candidate-image" place="top" content="Sube una imagen del candidato en formato JPG." />
          </label>
          <InputFile type="file" accept="image/jpeg" onChange={handleFileChange} />
        </div>

        {/* Botón de actualización */}
        <div className="flex justify-center items-center">
          <Boton type="submit" >
            Actualizar Candidato
          </Boton>
        </div>
      </form>
       {/* Vista previa de la imagen */}
       <div className="flex justify-center items-center ml-6">
        {imagePreview ? (
          <img className="h-60 w-72" src={imagePreview} alt={`Imagen del candidato`} />
        ) : candidateFinally?.imgUrl ? (
          <img className="h-60 w-72" src={candidateFinally.imgUrl} alt={`Imagen del candidato ${candidateFinally.imgUrl}`} />
        ) : (
          <p>Cargando imagen del candidato...</p>
        )}
      </div>
    </div>
  );
};

export default UpdateCandidate;
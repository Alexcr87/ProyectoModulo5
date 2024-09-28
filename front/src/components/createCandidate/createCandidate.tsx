'use client';
import { useEffect, useState } from "react";
import Boton from "../boton/Boton";

const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

const CreateCandidate = ({ userId }: { userId: string }) => {
  const [postulation, setPostulation] = useState<string>("");
  const [list, setList] = useState<string>("");
  const [campaignDescription, setCampaignDescription] = useState<string>("");
  const [proposals, setProposals] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [campaigns, setCampaigns] = useState<{ id: string; name: string }[]>([]);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>("");

  useEffect(() => {
    const fetchCampaigns = async () => {
      const localUser = localStorage.getItem("userSesion")
      const localUserParsed = JSON.parse(localUser!);
      const actualUserId = localUserParsed.result.id
   
      try {
        const response = await fetch(`${APIURL}/campaigns/user/${actualUserId}`);
        if (!response.ok) throw new Error("Error al obtener campañas");
        const data = await response.json();
        setCampaigns(data); // Asegúrate de que el formato de data sea el correcto
      } catch (error) {
        console.error("Error al cargar campañas:", error);
      }
    };

    fetchCampaigns();
  }, []);

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

    const formData = new FormData();
    formData.append("postulation", postulation);
    formData.append("list", list);
    formData.append("campaignDescription", campaignDescription);
    formData.append("proposals", JSON.stringify(proposals));
    formData.append("userId", userId);
    formData.append("campaignId", selectedCampaignId); // Usar el campaignId seleccionado
    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await fetch(`${APIURL}/candidates`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error en la creación del candidato");
      }

      window.location.href = "/candidates";    
    } catch (error) {
      console.error("Error al crear candidato:", error);
    }
  };

  return (
    <div className="flex w-[60%] justify-center p-6 bg-white shadow-lg rounded-lg">
      <form onSubmit={handleSubmit} className="w-11/12 space-y-4">
        <h1 className="text-lg font-bold text-center text-tertiaryColor">Crear Candidato</h1>
          <input
            type="text"
            placeholder="Postulación"
            value={postulation}
            onChange={(e) => setPostulation(e.target.value)}
            className="mt-1 p-2 pl-6 bg-secundaryColor rounded-full placeholder:text-tertiaryColor hover:scale-105 w-full"
            required
          />
          <input
            type="text"
            placeholder="Lista"
            value={list}
            onChange={(e) => setList(e.target.value)}
            className="mt-1 p-2 pl-6 bg-secundaryColor rounded-full placeholder:text-tertiaryColor hover:scale-105 w-full"
            required
          />

          <textarea
            value={campaignDescription}
            placeholder="Descripción de la campaña"
            onChange={(e) => setCampaignDescription(e.target.value)}
            className="mt-1 p-2 pl-6 bg-secundaryColor rounded-lg placeholder:text-tertiaryColor hover:scale-105 w-full"
            required
          />

        <div className="bg-gray-100 rounded-md">
          <label className="block text-sm font-medium text-gray-700">Propuestas</label>
          <textarea
            value={proposals.join("\n")}
            onChange={handleProposalsChange}
            className="mt-1 p-2 pl-6 bg-secundaryColor rounded-lg placeholder:text-tertiaryColor hover:scale-105 w-full"
            placeholder="Escribe cada propuesta en una nueva línea"
          />
        </div>

        <div className="bg-gray-100 rounded-md">
          <label className="block text-sm font-medium text-gray-700">Campaña</label>
          <select
            value={selectedCampaignId}
            onChange={(e) => setSelectedCampaignId(e.target.value)}
            className="mt-1 p-2 pl-6 bg-secundaryColor rounded-lg placeholder:text-tertiaryColor hover:scale-105 w-full"
            required
          >
            <option value="">Seleccione una campaña</option>
            {campaigns.map(campaign => (
              <option key={campaign.id} value={campaign.id}>{campaign.name}</option>
            ))}
          </select>
        </div>

        <div className="bg-gray-100 rounded-md">
          <label className="block text-sm font-medium text-gray-700">Imagen del candidato (JPG)</label>
          <input
            type="file"
            accept="image/jpeg"
            onChange={handleFileChange}
            className="mt-1 p-2 pl-6 bg-secundaryColor rounded-full placeholder:text-tertiaryColor hover:scale-105 w-full"
          />
        </div>
        <div className="flex justify-center">
          <Boton text="Crear Candidato" />
         </div>
          
      </form>
    </div>
  );
};

export default CreateCandidate;

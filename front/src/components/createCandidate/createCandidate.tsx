'use client';
import { useEffect, useState } from "react";

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
        const response = await fetch(`http://localhost:3000/campaigns/user/${actualUserId}`);
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
      const response = await fetch("http://localhost:3000/candidates", {
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
    <div className="flex max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="w-1/2 pr-4">
        <img 
          src="https://via.placeholder.com/300" // Reemplaza esta URL con la imagen que quieras
          alt="Descripción de la imagen"
          className="rounded-lg h-full object-cover"
        />
      </div>
      <form onSubmit={handleSubmit} className="w-1/2 space-y-4">
        <h1 className="text-lg font-bold text-center text-gray-800">Crear Candidato</h1>

        <div className="bg-gray-100 p-4 rounded-md">
          <label className="block text-sm font-medium text-gray-700">Postulación</label>
          <input
            type="text"
            value={postulation}
            onChange={(e) => setPostulation(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        <div className="bg-gray-100 p-4 rounded-md">
          <label className="block text-sm font-medium text-gray-700">Lista</label>
          <input
            type="text"
            value={list}
            onChange={(e) => setList(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        <div className="bg-gray-100 p-4 rounded-md">
          <label className="block text-sm font-medium text-gray-700">Descripción de la campaña</label>
          <textarea
            value={campaignDescription}
            onChange={(e) => setCampaignDescription(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        <div className="bg-gray-100 p-4 rounded-md">
          <label className="block text-sm font-medium text-gray-700">Propuestas</label>
          <textarea
            value={proposals.join("\n")}
            onChange={handleProposalsChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            placeholder="Escribe cada propuesta en una nueva línea"
          />
        </div>

        <div className="bg-gray-100 p-4 rounded-md">
          <label className="block text-sm font-medium text-gray-700">Campaña</label>
          <select
            value={selectedCampaignId}
            onChange={(e) => setSelectedCampaignId(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          >
            <option value="">Seleccione una campaña</option>
            {campaigns.map(campaign => (
              <option key={campaign.id} value={campaign.id}>{campaign.name}</option>
            ))}
          </select>
        </div>

        <div className="bg-gray-100 p-4 rounded-md">
          <label className="block text-sm font-medium text-gray-700">Imagen del candidato (JPG)</label>
          <input
            type="file"
            accept="image/jpeg"
            onChange={handleFileChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div className="text-center">
          <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200">
            Crear Candidato
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCandidate;

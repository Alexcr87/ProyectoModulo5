'use client';
import { useEffect, useState } from "react";
import Boton from "../ui/Boton";
import Input from "../ui/Input";
import InputFile from "../ui/InputFile";
import Textarea from "../ui/Textarea";
import Select from "../ui/Select";
import { useRouter } from "next/router";


const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

const updateCandidate = () =>  {


  return (
     <div className="flex w-[50%] justify-center p-6 bg-white shadow-lg rounded-lg m-auto">
   
      <form  className="w-11/12 space-y-4">
        <h1 className="text-lg font-bold text-center">Actualizar Candidato</h1>
          <Input
            type="text"
            placeholder="Postulación"
            // value={postulation}
            // onChange={(e) => setPostulation(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Lista"
            // value={list}
            // onChange={(e) => setList(e.target.value)}
            required
          />
          <Textarea
            // value={campaignDescription}
            placeholder="Descripción de la campaña"
            // onChange={(e) => setCampaignDescription(e.target.value)}
            required
          />
        <div className="rounded-md">
          <label className="block text-sm font-medium text-gray-700">Propuestas</label>
          <Textarea
            // value={proposals.join("\n")}
            // onChange={handleProposalsChange}
            placeholder="Escribe cada propuesta en una nueva línea"
          />
        </div>
        <div className="rounded-md">
          <label className="block text-sm font-medium text-gray-700">Campaña</label>
          <Select
            // value={selectedCampaignId}
            // onChange={(e) => setSelectedCampaignId(e.target.value)}
            required
          >
            <option value="">Seleccione una campaña</option>
            {/* {campaigns.map(campaign => (
              <option key={campaign.id} value={campaign.id}>{campaign.name}</option>
            ))} */}
          </Select>
        </div>
        <div className="rounded-md">
          <label className="block text-sm font-medium text-gray-700">Imagen del candidato (JPG)</label>
          <InputFile
            type="file"
            accept="image/jpeg"
            // onChange={handleFileChange}
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
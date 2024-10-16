'use client';
import { useEffect, useState } from "react";
import Boton from "../ui/Boton";
import Input from "../ui/Input";
import InputFile from "../ui/InputFile";
import Textarea from "../ui/Textarea";
import Select from "../ui/Select";
import { useRouter } from "next/router";
import { Tooltip } from 'react-tooltip';


const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

const updateCandidate = () =>  {


  return (
    <div className="flex w-[50%] justify-center p-6 bg-white shadow-lg rounded-lg m-auto">
      <form className="w-11/12 space-y-4">
        <h1 className="text-lg font-bold text-center">Actualizar Candidato</h1>
  
        {/* Postulación */}
        <div className="relative">
          <label className="flex items-center">
            Postulación
            <span
              className="ml-2 text-blue-500 cursor-pointer"
              data-tooltip-id="tooltip-postulation"
            >
              ℹ️
            </span>
            <Tooltip id="tooltip-postulation" place="top" content="Introduce el nombre de la postulación." />
          </label>
          <Input
            type="text"
            placeholder="Postulación"
            // value={postulation}
            // onChange={(e) => setPostulation(e.target.value)}
            required
          />
        </div>
  
        {/* Lista */}
        <div className="relative">
          <label className="flex items-center">
            Lista
            <span
              className="ml-2 text-blue-500 cursor-pointer"
              data-tooltip-id="tooltip-list"
            >
              ℹ️
            </span>
            <Tooltip id="tooltip-list" place="top" content="Indica la lista a la que pertenece el candidato." />
          </label>
          <Input
            type="text"
            placeholder="Lista"
            // value={list}
            // onChange={(e) => setList(e.target.value)}
            required
          />
        </div>
  
        {/* Descripción de la campaña */}
        <div className="relative">
          <label className="flex items-center">
            Descripción de la campaña
            <span
              className="ml-2 text-blue-500 cursor-pointer"
              data-tooltip-id="tooltip-campaign-description"
            >
              ℹ️
            </span>
            <Tooltip id="tooltip-campaign-description" place="top" content="Proporciona una breve descripción de la campaña." />
          </label>
          <Textarea
            // value={campaignDescription}
            placeholder="Descripción de la campaña"
            // onChange={(e) => setCampaignDescription(e.target.value)}
            required
          />
        </div>
  
        {/* Propuestas */}
        <div className="rounded-md">
          <label className="block text-sm font-medium text-gray-700">
            Propuestas
            <span
              className="ml-2 text-blue-500 cursor-pointer"
              data-tooltip-id="tooltip-proposals"
            >
              ℹ️
            </span>
            <Tooltip id="tooltip-proposals" place="top" content="Escribe cada propuesta en una nueva línea." />
          </label>
          <Textarea
            // value={proposals.join("\n")}
            // onChange={handleProposalsChange}
            placeholder="Escribe cada propuesta en una nueva línea"
          />
        </div>
  
        {/* Campaña */}
        <div className="rounded-md">
          <label className="block text-sm font-medium text-gray-700">
            Campaña
            <span
              className="ml-2 text-blue-500 cursor-pointer"
              data-tooltip-id="tooltip-campaign"
            >
              ℹ️
            </span>
            <Tooltip id="tooltip-campaign" place="top" content="Selecciona la campaña correspondiente." />
          </label>
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
  
        {/* Imagen del candidato */}
        <div className="rounded-md">
          <label className="block text-sm font-medium text-gray-700">
            Imagen del candidato (JPG)
            <span
              className="ml-2 text-blue-500 cursor-pointer"
              data-tooltip-id="tooltip-candidate-image"
            >
              ℹ️
            </span>
            <Tooltip id="tooltip-candidate-image" place="top" content="Sube una imagen del candidato en formato JPG." />
          </label>
          <InputFile
            type="file"
            accept="image/jpeg"
            // onChange={handleFileChange}
          />
        </div>
  
        {/* Botón de actualización */}
        <div className="flex justify-center">
          <div className="w-[40%]">
            <Boton>Actualizar Candidato</Boton>
          </div>
        </div>
      </form>
    </div>
  );
};
export default updateCandidate;
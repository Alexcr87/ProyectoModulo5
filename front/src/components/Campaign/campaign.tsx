'use client';

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import ICampaign from '@/interfaces/ICampaign'; 
import Input from '../ui/Input';
import Boton from '../ui/Boton';
import { useAuth } from '@/context/Authontext';
import IGroup from '@/interfaces/IGroup';
import Swal from "sweetalert2";
import Spinner from '../ui/Spinner';
import ICampaignError from '@/interfaces/ICampaignError';
import { validateCampaingError } from '@/helpers/validateCampaingError';
import ICampaignSinID from '@/interfaces/ICampaignSinId';
import { Tooltip } from 'react-tooltip';

const CampaignForm = () => {
  const { userData } = useAuth(); 
  const [isLoading, setIsLoading] = useState(false);
  const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

  const [groups, setGroups] = useState<IGroup[]>([]);
  const [errors, setErros] = useState<ICampaignError>({})
  const [formData, setFormData] = useState<ICampaignSinID>({
    name: '',
    description: '',
    location: '',
    date: new Date(),
    userId: userData?.userData.id || '', 
    user: { 
      id: userData?.userData.id || '', 
      name: userData?.userData.name || '', 
      dni: 0, 
      email: '' 
    },
    candidates: [],
    groups: []  // Aquí mantenemos un array de grupos seleccionados
  });

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch(`${APIURL}/groups/user/${userData?.userData.id}`);
        if (!response.ok) throw new Error("Error al obtener grupos");
        const data = await response.json();
        setGroups(data);
      } catch (error) {
        console.error("Error al cargar grupos:", error);
      }
    };

    fetchGroups();
  }, [userData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Obtén la fecha seleccionada en formato YYYY-MM-DD
    const selectedDate = event.target.value;

    // Convierte la cadena en un objeto Date y ajusta a la zona horaria de Argentina
    const argentinaDate = new Date(selectedDate + 'T00:00:00-03:00'); // -03:00 es la zona horaria de Argentina

    setFormData({
        ...formData,
        date: argentinaDate // Guarda la fecha ajustada
    });
};

  const handleMultiSelectChange = (selectedOptions: any) => {
    const selectedGroups = selectedOptions.map((option: any) => ({ id: option.value, name: option.label }));
    setFormData(prevData => ({
      ...prevData,
      groups: selectedGroups,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (formData.date <= today) {
      Swal.fire({
        icon: "error",
        title: "Fecha inválida",
        text: "La campaña debe tener una fecha futura.",
      });
      return; // Evitar que se procese el formulario si la fecha no es válida
    }
const data = {
      ...formData,
      
    }

  
    setIsLoading(true);
    try {
      const response = await fetch(`${APIURL}/campaigns`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json(); 
        throw new Error(errorData.message || "Error en la creación de la campaña"); 
      }
  
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Campaña creada con éxito",
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        
        window.location.href = "/campaigns";
      });
     

    } catch (error) {

      const errorMessage = (error as any).message || "Ocurrió un error inesperado.";
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage
      });
    }finally {
      setIsLoading(false);  // Oculta el spinner al finalizar la operación
    }

  };

  useEffect(()=>{
    const error = validateCampaingError(formData)
    setErros(error)
  },[formData])

  const formatDateToInput = (date: Date) => {
    // Obtén el año, mes y día
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses empiezan desde 0
    const day = String(date.getDate()).padStart(2, '0'); // Asegúrate de que el día tenga dos dígitos
    return `${year}-${month}-${day}`; // Devuelve en el formato correcto para el input
};



  return (
    <>
      <div className="col-start-5 col-end-9 mt-[2.5em] my-[2em] text-center text-xl">
        CREAR CAMPAÑA
      </div>
      <form onSubmit={handleSubmit} className="campaign-form flex justify-center">
        <div className='flex flex-col items-center w-full md:w-[40%] gap-4'>
        {isLoading ? (
            <Spinner />  
          ) : (
            <>
              {/* Nombre de la Campaña */}
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Nombre de la campaña"
                value={formData.name}
                onChange={handleInputChange}
                required
                data-tooltip-id="name-tooltip"
                data-tooltip-content="Ingresa un nombre para tu campaña"
              />
              <Tooltip id="name-tooltip" />
              {errors.name && (
                <div className="text-red-500 text-xs mt-2">{errors.name}</div>
              )}

              {/* Descripción */}
              <textarea
                id="description"
                name="description"
                placeholder="Descripción"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full h-40 px-5 py-3 text-base transition bg-transparent border rounded-md outline-none border-stroke dark:border-dark-3 text-body-color dark:text-dark-6 placeholder:text-black focus:border-primaryColor dark:focus:border-primaryColor focus-visible:shadow-none"
                required
                data-tooltip-id="description-tooltip"
                data-tooltip-content="Proporciona una descripción detallada"
              />
              <Tooltip id="description-tooltip" />
              {errors.description && (
                <div className="text-red-500 text-xs mt-2">{errors.description}</div>
              )}

              {/* Ubicación */}
              <Input
                type="text"
                id="location"
                name="location"
                placeholder="Ubicación"
                value={formData.location}
                onChange={handleInputChange}
                required
                data-tooltip-id="location-tooltip"
                data-tooltip-content="Indica la ubicación de la campaña"
              />
              <Tooltip id="location-tooltip" />
              {errors.location && (
                <div className="text-red-500 text-xs mt-2">{errors.location}</div>
              )}

              {/* Fecha */}
              <Input
  type="date"
  name="date"
  id="date"
  value={formatDateToInput(formData.date)} // Formato YYYY-MM-DD
  min={formatDateToInput(new Date())} // Asegúrate de que el mínimo sea también YYYY-MM-DD
  onChange={handleDateChange}
  required
  data-tooltip-id="date-tooltip"
  data-tooltip-content="Selecciona una fecha para la campaña"
/>
              <Tooltip id="date-tooltip" />
              {errors.date && (
                <div className="text-red-500 text-xs mt-2">{errors.date}</div>
              )}

              {/* Grupos */}
              <Select
                isMulti
                name="groups"
                options={groups.map(group => ({ value: group.id, label: group.name }))}
                className="basic-multi-select w-full"
                classNamePrefix="select"
                onChange={handleMultiSelectChange}
                value={formData.groups.map(group => ({ value: group.id, label: group.name }))}
                placeholder="Selecciona grupos"
                required
                data-tooltip-id="groups-tooltip"
                data-tooltip-content="Selecciona los grupos que participarán"
              />
              <Tooltip id="groups-tooltip" />

              {/* Botón de Crear */}
              <Boton type="submit">Crear Campaña</Boton>
            </>
        )}
        </div>
      </form>
    </>
  );
};

export default CampaignForm;





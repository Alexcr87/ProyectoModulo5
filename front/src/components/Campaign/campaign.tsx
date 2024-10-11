'use client';

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Input from '../ui/Input';
import Boton from '../ui/Boton';
import { useAuth } from '@/context/Authontext';
import IGroup from '@/interfaces/IGroup';
import Swal from "sweetalert2";
import Spinner from '../ui/Spinner';
import { Loader } from "@googlemaps/js-api-loader";
import Maps from '../maps/maps';
import ICampaignSinID from '@/interfaces/ICampaignSinID';

const CampaignForm = () => {
  const { userData } = useAuth(); 
  const [isLoading, setIsLoading] = useState(false);
  const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;
  const [coordinates, setCoordinates] = useState<{lat: number, lng: number} | null>(null);
  const [groups, setGroups] = useState<IGroup[]>([]);
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

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      date: new Date(e.target.value),
    }));
  };

  const handleMultiSelectChange = (selectedOptions: any) => {
    const selectedGroups = selectedOptions.map((option: any) => ({ id: option.value, name: option.label }));
    setFormData(prevData => ({
      ...prevData,
      groups: selectedGroups,
    }));
  };

  const handleGeocode = async () => {
    if (!formData.location) return;
  
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
      version: 'weekly',
    });
  
    const { Geocoder } = await loader.importLibrary('geocoding');
    const geocoder = new Geocoder();
  
    try {
      const geocodeResult = await geocoder.geocode({ address: formData.location });
  
      // Verificar si existen resultados
      if (geocodeResult && geocodeResult.results && geocodeResult.results.length > 0) {
        const position = geocodeResult.results[0].geometry.location;
        setCoordinates({ lat: position.lat(), lng: position.lng() });
  
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Ubicación encontrada',
          text: `Latitud: ${position.lat()}, Longitud: ${position.lng()}`,
          showConfirmButton: true,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Ubicación no encontrada',
          text: 'No pudimos encontrar la ubicación ingresada',
        });
      }
    } catch (error) {
      console.error('Error al geocodificar:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al intentar encontrar la ubicación.',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleGeocode ()
    
    const data = {
      ...formData,
      date: formData.date.toISOString(), // Asegúrate de que la fecha esté en formato ISO
    };
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

  return (
    <>
      <div className="col-start-5 col-end-9 mt-[2.5em] my-[2em] text-center text-xl">
        CREAR CAMPAÑA
      </div>
    <div>
      <form onSubmit={handleSubmit} className="campaign-form flex justify-center">
        <div className='flex flex-col items-center w-full md:w-[40%] gap-4'>
        {isLoading ? (
            <Spinner />  
          ) : (
            <>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Nombre de la campaña"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <textarea
            id="description"
            name="description"
            placeholder="Descripción"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full h-40 px-5 py-3 text-base transition bg-transparent border rounded-md outline-none border-stroke dark:border-dark-3 text-body-color dark:text-dark-6 placeholder:text-black focus:border-primaryColor dark:focus:border-primaryColor focus-visible:shadow-none"
            required
          />
          <Input
            type="text"
            id="location"
            name="location"
            placeholder="Ubicación"
            value={formData.location}
            onChange={handleInputChange}
            required
          />
          <Input
            type="date"
            name="date"
            id="date"
            value={formData.date.toISOString().substring(0, 10)}
            onChange={handleDateChange}
            required
          />

          <Select
            isMulti
            name="groups"
            options={groups.map(group => ({ value: group.id, label: group.name }))}
            className="basic-multi-select w-full"
            classNamePrefix="select"
            onChange={handleMultiSelectChange}
            value={formData.groups.map(group => ({ value: group.id, label: group.name }))}
            placeholder='Selecciona grupos'
            required
          />

          <Boton type="submit">Crear Campaña</Boton>
          </>
        )}
        </div>
      </form>
      <div className="w-full md:w-1/2 h-[400px] bg-gray-100">
          {coordinates ? (
            <Maps coordinates={coordinates} />
          ) : (
            <p className="text-center mt-20">El mapa aparecerá aquí cuando ingreses una ubicación.</p>
          )}
        </div>
        </div>
    </>
  );
};

export default CampaignForm;





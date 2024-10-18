'use client';

import React, { useState, useEffect } from 'react';
import ICampaign from '@/interfaces/ICampaign'; 
import Input from '../ui/Input';
import Boton from '../ui/Boton';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/context/Authontext';
import IGroup from '@/interfaces/IGroup';
import Spinner from '../ui/Spinner';
import { Tooltip } from 'react-tooltip';
import ICampaignSinID from '@/interfaces/ICampaignSinId';
import Swal from 'sweetalert2';

const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;


const updateCampaign = () => {
  const router = useRouter()
  const { userData } = useAuth(); 
  const [campaign, setCampaign] = useState<ICampaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ICampaignSinID>({
    name: '',
    description: '',
    location: '',
    date: new Date()||'',
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
 
  const searchParams = useSearchParams(); // Obtener parámetros de la URL
  const id = searchParams.get('id'); // Obtener el id de la campaña de los parámetros de la URL

  
  useEffect(() => {
    if (id) {
      setLoading(true)
      fetch(`${APIURL}/campaigns/${id}`)
        .then(response => response.json())
        .then(data => {
          setCampaign(data);
          setFormData({
            name: data.name,
            description: data.description,
            location: data.location,
            date: new Date(data.date), // Asegúrate de que la fecha se maneje correctamente
            userId: userData?.userData.id || '', 
            user: { 
              id: userData?.userData.id || '', 
              name: userData?.userData.name || '', 
              dni: 0, 
              email: '' 
            },
            candidates: [],
            groups: [] 
          });
          setLoading(false);
        })
        .catch(error => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [id]);

 
  // ESTA FUNCION EJECUTA LA MODIFICACION

  const handleUpdateCampaign = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true); 
    try {
      const form = event.target as HTMLFormElement;
      const formData = new FormData(form);
      if(!campaign){
        return
      }
      const selectedDate = formData.get('date') as string;
      const updatedCampaign = {
        name: formData.get('name'),
        description: formData.get('description'),
        location: formData.get('location'),
        date: new Date(selectedDate + 'T00:00:00-03:00').toISOString() || formatDateToInput(campaign.date),
      };
      const response = await fetch(`${APIURL}/campaigns/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCampaign),
      });
      const data = await response.json();
      if (response.ok) { 
        setCampaign(data); // Actualiza la campaña con la nueva data
        setError(null); // Limpia cualquier error previo
        Swal.fire({
          title: '¡Éxito!',
          text: 'La campaña se ha actualizado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        }).then(() => {
          router.push('/campaigns');
        });
      } else {
        setError(data.message || 'Ocurrió un error');
        setError(data.message || 'Ocurrió un error');
      Swal.fire({
        title: 'Error',
        text: data.message || 'Ocurrió un error al actualizar la campaña.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      }
    } catch (error) {
      const errorMessage = (error as { message: string }).message;
      setError(errorMessage);
      Swal.fire({
        title: 'Error',
        text: errorMessage || 'Ocurrió un error inesperado.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    } finally {
      setLoading(false); // Asegúrate de que se detenga la carga después de la petición
    }
  };

  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner /> {/* Show spinner while loading */}
      </div>
    );
  }

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

const formatDateToInput = (date: Date) => {
  // Obtén el año, mes y día
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses empiezan desde 0
  const day = String(date.getDate()).padStart(2, '0'); // Asegúrate de que el día tenga dos dígitos
  return `${year}-${month}-${day}`; // Devuelve en el formato correcto para el input
};
const today = new Date().toLocaleDateString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' }).substring(0, 10)


let isToday = false
  if(campaign?.date && new Date(campaign.date).toLocaleDateString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' }).substring(0, 10) === today){
     isToday =true
  }


  return (
    <>
      <div className="col-start-5 col-end-9 mt-10 my-8 text-center text-xl font-bold">
        ACTUALIZAR CAMPAÑA
        
        <div className="flex flex-col md:flex-row items-center w-full md:w-4/5 lg:w-3/5 gap-4 m-auto mt-8 py-8 px-6 font-bold border-4 rounded-lg border-stroke dark:border-dark-3 border-primaryColor shadow-lg">
          <p>{`Campana: ${campaign?.name}`}</p>
          <p>{`Fecha: ${campaign?.date ? new Date(campaign.date).toLocaleDateString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' }).split('T')[0] : ''}`}</p>
        </div>
      </div>
      <form className="campaign-form flex justify-center" onSubmit={handleUpdateCampaign}>
        <div className="flex flex-col items-center w-full md:w-[40%] gap-4">
          {/* Nombre */}
          <div className="relative w-full">
            
            <label className="flex items-center">
              Nombre
              <span className="ml-2 text-primaryColor cursor-pointer" data-tooltip-id="tooltip-name">
                ℹ️
              </span>
              <Tooltip id="tooltip-name" place="top" content="Introduce el nombre de la campaña." />
            </label>
            
            <Input
              type="text"
              id="name"
              name="name"
              placeholder='Nombre'
              className="w-full px-5 py-3 text-base transition bg-transparent border rounded-md outline-none 
                border-stroke dark:border-dark-3 text-body-color dark:text-dark-6 placeholder:text-black focus:border-primaryColor 
                dark:focus:border-primaryColor focus-visible:shadow-none"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
  
          {/* Descripción */}
          <div className="relative w-full">
            <label className="flex items-center">
              Descripción
              <span className="ml-2 text-primaryColor cursor-pointer" data-tooltip-id="tooltip-description">
                ℹ️
              </span>
              <Tooltip id="tooltip-description" place="top" content="Proporciona una breve descripción de la campaña." />
            </label>
            <textarea
              id="description"
              name="description"
              placeholder='Descripción'
              className="w-full h-40 px-5 py-3 text-base transition bg-transparent border rounded-md outline-none 
                border-stroke dark:border-dark-3 text-body-color dark:text-dark-6 placeholder:text-black focus:border-primaryColor 
                dark:focus:border-primaryColor focus-visible:shadow-none"
                value={formData.description} // Vincula el textarea al estado formData
              onChange={(e) => setFormData({ ...formData, description: e.target.value })} // Maneja el cambio
              required
            />
          </div>
  
          {/* Ubicación */}
          <div className="relative w-full">
            <label className="flex items-center">
              Ubicación
              <span className="ml-2 text-primaryColor cursor-pointer" data-tooltip-id="tooltip-location">
                ℹ️
              </span>
              <Tooltip id="tooltip-location" place="top" content="Indica la ubicación de la campaña." />
            </label>
            <Input
              type="text"
              id="location"
              name="location"
              placeholder='Ubicación'
              className="w-full px-5 py-3 text-base transition bg-transparent border rounded-md outline-none 
                border-stroke dark:border-dark-3 text-body-color dark:text-dark-6 placeholder:text-black focus:border-primaryColor 
                dark:focus:border-primaryColor focus-visible:shadow-none"
                value={formData.location} // Vincula el input al estado formData
                onChange={(e) => setFormData({ ...formData, location: e.target.value })} // Maneja el cambio  
              required
            />
          </div>
  
         
{!isToday ? (
  <div className="relative w-full">
    <label className="flex items-center">
      Fecha
      <span className="ml-2 text-primaryColor cursor-pointer" data-tooltip-id="tooltip-date">
        ℹ️
      </span>
      <Tooltip id="tooltip-date" place="top" content="Selecciona la fecha de la campaña." />
    </label>
    <Input
      type="date"
      name="date"
      id="date"
      value={formatDateToInput(formData.date)} // Formato YYYY-MM-DD
      min={formatDateToInput(new Date())} // Asegúrate de que el mínimo sea también YYYY-MM-DD
      onChange={handleDateChange}
      className="w-full px-5 py-3 text-base transition bg-transparent border rounded-md outline-none 
        border-stroke dark:border-dark-3 text-body-color dark:text-dark-6 focus:border-primaryColor 
        dark:focus:border-primaryColor focus-visible:shadow-none"
      required
    />
  </div>
) : (
  // Campo oculto con la fecha para cuando isToday es true
  <input type="hidden" name="date" value={formatDateToInput(formData.date)} />
)}
  
          {/* Botón de actualización */}
          <div className='mb-8'>
            <Boton type="submit">Actualizar Campaña</Boton>
          </div>
        </div>
      </form>
    </>
  );
} 

export default updateCampaign;
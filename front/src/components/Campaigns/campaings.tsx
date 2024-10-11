'use client';
import React, { useEffect, useState } from 'react'
import {ICampaign} from '@/interfaces/ICampaign'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/context/Authontext';
import Spinner from '../ui/Spinner';
import Swal from 'sweetalert2';
import {deleteCampaign} from "../../helpers/campaña.helper";


const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

const CampaignsTable = () => {
    const { userData } = useAuth();
    const [selectedCampaigns, setSelectedCampaigns] = React.useState<ICampaign[]>([]);
    const [campaigns, setCampaigns] = useState<ICampaign[]>([]) 
    const [loading, setLoading] = useState(true) 
    const [error, setError] = useState<string | null>(null) 
    const [roles, setRoles] = useState<string[]>([])
    const [groups, setGroups] = useState<string[]>([])
    const pathname = usePathname();
    const router = useRouter()
    


    
    useEffect(() => {
        if (userData) {
            setRoles(userData.userData.roles.map(role => role.name));
            setGroups(userData.userData.groups.map(group => group.id).filter((group): group is string => group !== undefined));
        }
    }, [userData]);

    useEffect(() => {
        if (userData?.userData.id) {
            fetchCampaigns();
        }
    }, [roles, groups, userData, pathname]);

    const fetchCampaigns = async () => {
        if (!userData?.userData.id) {
            setLoading(false);
            return;
        }

        const actualUser = String(userData?.userData.id);
       
        try {                
            let response;
        
            if (roles.includes('candidate') || roles.includes('voter')) {
                response = await fetch(`${APIURL}/campaigns/groups`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ groupIds: groups })
                });
            } else {
                response = await fetch(`${APIURL}/campaigns/user/${actualUser}`);
            }
        
            if (!response || !response.ok) {
                throw new Error('Error al obtener las campañas');
            }
        
            const data: ICampaign[] = await response.json();
            setCampaigns(data);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Error desconocido');
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <div><Spinner /></div>; // Usa <div> en lugar de <p>
    if (error) return <div>{error}</div>; // También reestructura el manejo de errores


    const handleAction= (id: string|undefined)=>{

        if (roles.includes('candidate') || roles.includes('voter')) {
            router.push(`/voting?campaignId=${id}`)
        } else {
            router.push(`/campaigndesc?campaignId=${id}`)
        }
    }

    const handleSelect = (checked: boolean, campaign: ICampaign) => {
        if (checked) {
            setSelectedCampaigns([...selectedCampaigns, campaign]);
        } else {
            setSelectedCampaigns(selectedCampaigns.filter((c) => c.id !== campaign.id));
        }
    };
    
    
    const handleDelete = async () => {
        // Obtener IDs de campañas seleccionadas y asegurarse de que sean solo strings
        const campaignIds: string[] = selectedCampaigns
        .map(campaign => campaign.id) // Mapeo a campaign.id
        .filter((id): id is string => id !== undefined);// Filtra para que solo queden strings
    
        // Verificar si se han seleccionado campañas
        if (campaignIds.length === 0) {
            Swal.fire('Advertencia!', 'No se seleccionaron campañas para eliminar.', 'warning');
            return;
        }
    
        // Confirmar eliminación
        const confirmDelete = await Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción eliminará las campañas seleccionadas.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        });
    
        // Si se confirma la eliminación
        if (confirmDelete.isConfirmed) {
            try {
                await deleteCampaign(campaignIds); // Llama a la función de eliminación
                Swal.fire('Eliminado!', 'Las campañas han sido eliminadas.', 'success');
    
                // Actualiza el estado de campañas en el frontend
                setCampaigns(prevCampaigns => 
                    prevCampaigns.filter(campaign => !campaignIds.includes(campaign.id)) // Aquí no necesitas el 'as string'
                );
    
                // Limpia la selección de campañas
                setSelectedCampaigns([]); 
            } catch (error: unknown) {
                // Manejo de errores
                if (error instanceof Error) {
                    Swal.fire('Error!', error.message, 'error');
                } else {
                    Swal.fire('Error!', 'Se produjo un error desconocido.', 'error');
                }
            }
        }
    };
    
    const handleUpdate = (id: string | undefined ) => {
        if (roles.includes('admin') || roles.includes('moderator')) {
            router.push(`/updateCampaign?id=${id}`);
        } else {
            console.log('No tienes permisos para actualizar la campaña');
        }
       
      };
    
    return (
        <div className="mt-4 overflow-x-auto">
            <h1 className="text-2xl font-bold mb-4 text-center">Mis Campañas</h1>
            <div className="mb-4">
        <button className='bg-primaryColor  text-cuartiaryColor py-2 px-4 flex justify-center rounded-lg hover:scale-105 hover:bg-primaryColor duration-300'
         onClick={handleDelete}>
            Eliminar seleccionados
        </button>
            </div>
            {campaigns.length > 0 ? (   
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-primaryColor text-left text-white">
                        <th className="border p-2">Seleccionar</th>
                            <th className="border p-2">Nombre</th>
                            <th className="border p-2">Descripción</th>
                            <th className="border p-2">Ubicación</th>
                            <th className="border p-2">Fecha</th>
                            <th className="border p-2">Ver</th>
                            {roles.includes('admin') || roles.includes('moderator') ? (
                                <th className="border p-2">Actualizar</th>
                            ) : null}
                        </tr>
                    </thead>
                    <tbody>
                        {campaigns.map((campaign, index) => (
                            <tr key={index} 
                                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} border-t border-gray-200`}
                                // onClick={()=>handleAction(campaign.id)}
                            >
                                <td className="border p-2"><input type="checkbox" onChange={(e) => handleSelect(e.target.checked,campaign)}/></td>
                                <td className="border p-2">{campaign.name}</td>
                                <td className="border p-2">{campaign.description}</td>
                                <td className="border p-2">{campaign.location}</td>
                                <td className="border p-2">{new Date(campaign.date).toLocaleDateString()}</td>
                                <td className="border p-2 text-blue-500 hover:text-blue-700 cursor-pointer " onClick={()=>handleAction(campaign.id)}>
                                    {roles.includes('candidate') || roles.includes('voter') ? 'votar' : 'ver'}
                                </td>
                                <td className="border p-2 text-blue-500 hover:text-blue-700 cursor-pointer">
                                    {roles.includes('admin') || roles.includes('moderator') ? (
                                        <span onClick={() => handleUpdate(campaign.id)}>Actualizar</span>
                                    ) : null}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay campañas disponibles</p>
            )}
        </div>
    )
}

export default CampaignsTable

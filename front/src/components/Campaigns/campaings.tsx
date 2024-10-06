'use client'
import React, { useEffect, useState } from 'react'
import ICampaign from '@/interfaces/ICampaign'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/context/Authontext';
import Boton from '../ui/Boton';

const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

const CampaignsTable = () => {
    const { userData } = useAuth();
    const [campaigns, setCampaigns] = useState<ICampaign[]>([]) 
    const [loading, setLoading] = useState(true) 
    const [error, setError] = useState<string | null>(null) 
    const [selectedCampaigns, setSelectedCampaigns] = useState<ICampaign[]>([]);
    const pathname = usePathname();
    const router = useRouter()

    useEffect(() => {
        const fetchCampaigns = async () => {
            if (!userData?.userData.id) {
                setLoading(false); // Termina la carga si no hay ID
                return;
            }
        
            const actualUser = String(userData?.userData.id);
           

            try {
                const response = await fetch(`${APIURL}/campaigns/user/${actualUser}`)
             

                if (!response.ok) {
                    throw new Error('Error al obtener las campañas');
                }

                const data: ICampaign[] = await response.json();
          
                setCampaigns(data);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Error desconocido');
            } finally {
                setLoading(false); // Cerrar el estado de carga
            }
        }

        if (userData?.userData.id) {
            fetchCampaigns(); // Ejecuta el fetch solo si hay userSesion
        }
    }, [userData, pathname]); // Agregar userSesion como dependencia para ejecutar el fetch

    if (loading) return <p>Cargando campañas...</p>
    if (error) return <p>{error}</p>

    const handleVer= (id: string|undefined)=>{
        router.push(`/campaigndesc?campaignId=${id}`)
    }


    // const handleSelectAll = (checked: boolean) => {
    //     if (checked) {
    //         setSelectedCampaigns(campaigns);
    //     } else {
    //         setSelectedCampaigns([]);
    //     }
    // };
    
    const handleSelect = (checked: boolean, campaign: ICampaign) => {
        if (checked) {
            setSelectedCampaigns([...selectedCampaigns, campaign]);
        } else {
            setSelectedCampaigns(selectedCampaigns.filter((c) => c.id !== campaign.id));
        }
    };
    
    // const handleDeleteSelected = async () => {
    //     if (selectedCampaigns.length === 0) return;
    
    //     try {
    //         const response = await fetch(`${APIURL}/campaigns/delete`, {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(selectedCampaigns.map((c) => c.id)),
    //         });
    
    //         if (!response.ok) {
    //             throw new Error('Error al eliminar las campañas');
    //         }
    
    //         setSelectedCampaigns([]);
    //         setCampaigns(campaigns.filter((c) => !selectedCampaigns.includes(c)));
    //     } catch (error) {
    //         setError(error instanceof Error ? error.message : 'Error desconocido');
    //     }
    // };

    return (
        <div className="mt-4 overflow-x-auto">
            <h1 className="text-2xl font-bold mb-4 text-center">Mis Campañas</h1>
            <div className="mb-4">
        <button className='bg-primaryColor  text-cuartiaryColor py-2 px-4 flex justify-center rounded-lg hover:scale-105 hover:bg-primaryColor duration-300' 
            // onClick={handleDeleteSelected}
        >
            Eliminar seleccionados
        </button>
    </div>
            {campaigns.length > 0 ? (   
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-primaryColor text-left text-white">
                        <th className="border p-1">
                        {/* <input
                        type="checkbox"
                         onChange={(e) => handleSelectAll(e.target.checked)}
                        /> */}
                        </th>
                            <th className="border p-2">Nombre</th>
                            <th className="border p-2">Descripción</th>
                            <th className="border p-2">Ubicación</th>
                            <th className="border p-2">Fecha</th>
                            <th className="border p-2">Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {campaigns.map((campaign, index) => (
                            <tr key={index} 
                                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} border-t border-gray-200`}
                                // onClick={(e) => {
                                //     const target = e.target as HTMLInputElement;
                                //     if (target.type !== 'checkbox') {
                                //         handleVer(campaign.id)
                                //     }
                                // }}
                                // // onClick={()=>handleVer(campaign.id)}
                            >
                <td className="border p-1">
                <input
                    type="checkbox"
                    checked={selectedCampaigns.includes(campaign)}
                    onChange={(e) => handleSelect(e.target.checked, campaign)}
                />
            </td>
                                <td className="border p-2">{campaign.name}</td>
                                <td className="border p-2">{campaign.description}</td>
                                <td className="border p-2">{campaign.location}</td>
                                <td className="border p-2">{new Date(campaign.date).toLocaleDateString()}</td>
                                <td className="border p-2 text-blue-500 hover:text-blue-700 cursor-pointer" onClick={() => handleVer(campaign.id)}>ver </td>
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

export default CampaignsTable;


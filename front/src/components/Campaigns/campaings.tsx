'use client'
import React, { useEffect, useState } from 'react'
import ICampaign from '@/interfaces/ICampaign'
import { IloginProps } from '@/interfaces/ILogin'
import { usePathname } from 'next/navigation'
const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;
const CampaignsTable = () => {
    const [campaigns, setCampaigns] = useState<ICampaign[]>([]) 
    const [loading, setLoading] = useState(true) 
    const [error, setError] = useState<string | null>(null) 
    const pathname = usePathname();

    const [userSesion, setUserSesion] = useState<IloginProps | null>(null);

    // Obtener la sesión del usuario desde el localStorage
    useEffect(() => {
        const localUser = localStorage.getItem("userSesion");
        if (localUser) {
            const parsedUser = JSON.parse(localUser);
            setUserSesion(parsedUser);
           
        }
    }, [pathname]);

    useEffect(() => {
        const fetchCampaigns = async () => {
            if (!userSesion?.result?.id) {
                setLoading(false); // Termina la carga si no hay ID
                return;
            }
        
            const actualUser = String(userSesion.result.id);
           

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

        if (userSesion?.result?.id) {
            fetchCampaigns(); // Ejecuta el fetch solo si hay userSesion
        }
    }, [userSesion]); // Agregar userSesion como dependencia para ejecutar el fetch

    if (loading) return <p>Cargando campañas...</p>
    if (error) return <p>{error}</p>

    return (
        <div className="mt-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Mis Campañas</h1>
            {campaigns.length > 0 ? (   
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-primaryColor text-left text-white">
                            <th className="border p-2">Nombre</th>
                            <th className="border p-2">Descripción</th>
                            <th className="border p-2">Ubicación</th>
                            <th className="border p-2">Fecha</th>
                            <th className="border p-2">Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {campaigns.map((campaign, index) => (
                            <tr key={index} className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} border-t border-gray-200`}>
                                <td className="border p-2">{campaign.name}</td>
                                <td className="border p-2">{campaign.description}</td>
                                <td className="border p-2">{campaign.location}</td>
                                <td className="border p-2">{new Date(campaign.date).toLocaleDateString()}</td>
                                <td className="border p-2">
                                    <a href={`/campaigndesc?campaignId=${campaign.id}`} className="text-blue-500 hover:text-blue-700 font-medium">
                                        Ver
                                    </a>
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

export default CampaignsTable;

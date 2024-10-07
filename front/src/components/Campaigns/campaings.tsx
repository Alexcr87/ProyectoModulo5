'use client';
import React, { useEffect, useState } from 'react'
import ICampaign from '@/interfaces/ICampaign'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/context/Authontext';
import Spinner from '@/components/ui/Spinner'; // Asegúrate de importar el spinner

const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

const CampaignsTable = () => {
    const { userData } = useAuth();
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

    const handleAction = (id: string | undefined) => {
        if (roles.includes('candidate') || roles.includes('voter')) {
            router.push(`/voting?campaignId=${id}`);
        } else {
            router.push(`/campaigndesc?campaignId=${id}`);
        }
    };

    if (loading) return <Spinner />; // Aquí usamos el spinner durante la carga
    if (error) return <p>{error}</p>;

    return (
        <div className="mt-4 overflow-x-auto">
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
                            <tr key={index} 
                                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} border-t border-gray-200`}
                                onClick={() => handleAction(campaign.id)}
                            >
                                <td className="border p-2">{campaign.name}</td>
                                <td className="border p-2">{campaign.description}</td>
                                <td className="border p-2">{campaign.location}</td>
                                <td className="border p-2">{new Date(campaign.date).toLocaleDateString()}</td>
                                <td className="border p-2 text-blue-500 hover:text-blue-700">
                                    {roles.includes('candidate') || roles.includes('voter') ? 'votar' : 'ver'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay campañas disponibles</p>
            )}
        </div>
    );
}

export default CampaignsTable;

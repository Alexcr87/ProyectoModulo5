import ICampaign from "@/interfaces/ICampaign";
import { IVotesResult } from "@/interfaces/IVotesResult";

const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

export async function getCampañaByID(id: string):Promise<IVotesResult[]>{
    try {
        const res = await fetch(`${APIURL}/votes/candidates/${id}`,{
            //next: {revalidate: 1200},
            cache: 'no-cache'
        })
        const campaña: IVotesResult[] = await res.json()
        return campaña
    } catch (error:any) {
        throw new Error(error)
    }
}

export const deleteCampaign = async (campaignIds: string[]) => {
    try {
        const res = await fetch(`${APIURL}/campaigns`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ids: campaignIds }),
        });

        console.log('Response status:', res.status); // Verifica el estado de la respuesta

        if (!res.ok) {
            const errorData = await res.text();
            console.log('Error data:', errorData); // Registra los datos de error
            throw new Error(`Error al eliminar la campaña con ID(s): ${errorData}`);
        }

        const responseData = await res.json();
        return responseData; 
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error en la función deleteCampaign:', error.message); // Registro más claro del error
            throw new Error(error.message || 'Error desconocido al eliminar la campaña.');
    }
}
}

export async function getCampaigns() {
    try {
        const res = await fetch(`${APIURL}/campaigns`)
        const campaigns: ICampaign[] = await res.json()
        return campaigns
        
    } catch (error: any) {
        throw new Error(error)
    }
    
}

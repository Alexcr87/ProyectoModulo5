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

export async function getCampaigns() {
    try {
        const res = await fetch(`${APIURL}/campaigns`)
        const campaigns: ICampaign[] = await res.json()
        return campaigns
        
    } catch (error: any) {
        throw new Error(error)
    }
    
}

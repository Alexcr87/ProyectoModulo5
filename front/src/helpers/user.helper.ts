import IUser from "@/interfaces/IUser";

const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

export async function getCandidates(): Promise<IUser[]> {
    try {
        const res = await fetch(`${APIURL}/candidates`,{
            cache: 'no-cache' 
        })
        const users = await res.json()
        return users
    } catch (error:any) {
        throw new Error(error)
    }
}

export async function getUserByID(id:number): Promise<IUser> {
   
    try {
        const res = await fetch(`${APIURL}/user/${id}`,{
            next: {revalidate: 1200}
        })
        const user = await res.json()
        return user
    } catch (error:any) {
        throw new Error(error)
    }
}
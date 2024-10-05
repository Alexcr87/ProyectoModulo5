import { IRegisterProps } from "@/components/Register/TypesRegister";
import IUser from "@/interfaces/IUser";
import IUsers from "@/interfaces/IUsers";
import { updateUserSession, userSession } from "@/interfaces/Session";

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

export async function getUserByID(id:string):Promise<updateUserSession> {
   
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

export async function updateUserById(userData:IRegisterProps, id:string) {
    try {
        const res = await fetch(`${APIURL}/user/${id}`,{
            method:"PUT",
            headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify(userData),
        })
        if (!res.ok) {
            return "respuesta error"
        }
        const user = await res.json()
        console.log(user, "user");
        
        return user
        
    } catch (error:any) {
        throw new Error(error)
    }
    
}


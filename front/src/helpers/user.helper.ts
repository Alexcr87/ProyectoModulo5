import IUser from "@/interfaces/IUser";

const APIURL = "http://localhost:3000"

export async function getUsers(): Promise<IUser[]> {
    try {
        const res = await fetch(`${APIURL}/user`,{
            next: {revalidate: 1200}
        })
        const users = res.json()
        return users
    } catch (error:any) {
        throw new Error(error)
    }
}
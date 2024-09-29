const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

export async function getAuth0(){
    try {
        const res = await fetch(`${APIURL}/auth/protected`,{
            //next: {revalidate: 1200},
            cache: 'no-cache'
        })
        const login = await  res.json
        
        
        return login

    } catch (error:any) {
        throw new Error(error)
    }
}
export default getAuth0
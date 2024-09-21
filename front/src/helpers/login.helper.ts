
// const Login = [

//     {
//        "email" : "ramongonzalez101@gmail.com",
//        "password": "12345678",
//        "token" : "123456678"
//     },

//     {
//         "email" : "ramongonzalez102@gmail.com",
//         "password": "12345678",
//         "token" : "87654321"  
//     }
// ]

// export default Login

import { IloginProps } from "@/interfaces/ILogin"

const APIURL = process.env.NEXT_PUBLIC_API_URL

// FUNCION QUE OBTIENE TODOS LOS PRODUCTOS

export async function login(userData : IloginProps) {
    try {
      // const ResLogin = await fetch (`${APIURL}/auth/sigIn`, {

        const ResLogin = await fetch (`${APIURL}/auth/sigIn`, {
        // cache: 'no-cache'
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify (userData)    
    })

    if (ResLogin.ok) {
        return ResLogin.json()
    } else {
      throw Error ("Failed to Login")
    }

   } catch (error: any) {
    throw new Error (error)   
    }
  };
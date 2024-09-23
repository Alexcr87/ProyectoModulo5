
export interface IloginProps {
    email : string
    password : string
    token? : string
    result?:{
        id?:string
        roles?:[
            {
                id?:string
            },
        ]
    }
}

export interface IloginError {
    email?: string
    password?: string
}
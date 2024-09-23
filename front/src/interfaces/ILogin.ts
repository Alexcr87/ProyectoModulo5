
export interface IloginProps {
    email : string
    password : string
    token? : string
}

export interface IloginError {
    email?: string
    password?: string
}
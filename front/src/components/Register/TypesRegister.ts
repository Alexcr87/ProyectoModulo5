export interface IRegisterProps {
    id?:string;
    city: string;
    country: string;
    password: string;
    email: string;
    name: string;
    address: string;
    dni: string
}
export type IRegisterError = Partial<IRegisterProps>
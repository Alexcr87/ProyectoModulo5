import IGroup from "@/interfaces/IGroup";

export interface IRegisterProps {
    id?:string;
    city: string;
    country: string;
    password: string;
    email: string;
    name: string;
    address: string;
    dni: string;
    groups?: IGroup[]
}
export type IRegisterError = Partial<IRegisterProps>
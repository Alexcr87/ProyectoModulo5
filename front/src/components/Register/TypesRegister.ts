export interface IRegisterProps {
    email: string;
    name: string;
    address: string;
    dni: string
}
export type IRegisterError = Partial<IRegisterProps>
export interface IChangePassword{
  dni?:string,
  password: string,
  newPassword: string,
  confirmPassword: string,
}

export interface IChangePassworError {
  password?: string,
  newPassword?: string,
  confirmPassword?: string,
}
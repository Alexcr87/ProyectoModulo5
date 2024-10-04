export interface IChangePassword{
  dni:number,
  password: string,
  newPassword: string,
  confirmPassword: string,
}

export interface IChangePassworError {

  password?: string,
  newPassword?: string,
  confirmPassword?: string,
}
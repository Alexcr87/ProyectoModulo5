export interface userSession {
    token: string,
    userData:{
        id: number;
        address: string;
        email: string;
        name: string;
    }
}
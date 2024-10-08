export interface Country {
  id: number;
  name: string;
}

export interface City {
  id: number;
  id_country: number;
  name: string;
}
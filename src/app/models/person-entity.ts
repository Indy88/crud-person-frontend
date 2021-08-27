
export interface IPerson {
  id?: number;
  fullname: string;
  cpf: number;
  datebirth: Date;
  email: string;
  sex: boolean;
  phone?: string;
  description?: string;
  neighborhood: string;
  codeNumber: string;
  city: string;
  address: string;
  latitude: number;
  longitude: number;
  created_at: Date;
  updated_at: Date;
}

export interface Gender {
  name: string;
  code: boolean;
}

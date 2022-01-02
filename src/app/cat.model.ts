export interface Cat {
  id: string;
  name: string;
  age: number;
  gender: string;
  birthDate?: any;
  colors?: Array<string>;
  imgPath: string;
  likes?: string;
  location?: {_lat: number, _long: number};
}

export interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

export interface Boat {
  name: string;
  capacity: number;
  crew: number;
  patron: boolean;
  booked?: [object];
  owner?: string;
  pricePerDay: number;
  photos?: [string],
  description: string,
  position?: {
    longitude: number,
    latitude: number
  },
  city: string,
  _id?: string
}
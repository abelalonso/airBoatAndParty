export interface Boat {
  Name: string;
  capacity: number;
  crew: number;
  dimensions: string;
  booked?: [object];
  owner?: string;
  pricePerDay: number;
  photos?: [string],
  position?: {
    longitude: number,
    latitude: number
  },
  city: string
}
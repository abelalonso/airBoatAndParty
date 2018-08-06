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
  station?: string,
  _id?: string
}
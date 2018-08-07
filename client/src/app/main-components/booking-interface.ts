export interface Booking {
  startDate: Date;
  endDate: Date;
  user: string;
  boat: string;
  confirmed?: Boolean,
  totalPrice: Number,
  use?: String,
  shoppingCart?: String,
  isActive?: boolean;
  _id?: string;
}
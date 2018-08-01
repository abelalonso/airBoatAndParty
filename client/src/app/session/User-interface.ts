export interface User {
  username: string;
  password: string;
  email: string;
  name: string;
  surname: string;
  boats?: Array<string>;
  reservations?: Array<string>;
  profileImage?: string;
  _id?: string;
}
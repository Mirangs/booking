export interface Role {
  id: string;
  name: string;
}

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface TimeSlot {
  id: string;
  from: Date;
  to: Date;
}

export interface Apartment {
  id: string;
  name: string;
  description: string;
  image: string;
  price: Number;
  number_of_rooms: Number;
  time_slots: TimeSlot[];
  owner: User;
}

export interface Order {
  id: string;
  voucher: string;
  quantity: Number;
}

export interface Voucher {
  id: string;
  name: string;
  description: string;
  image: string;
  price: Number;
  variant: {
    name: string;
  };
  quantity: Number;
}

export interface Item {
  id: number;
  name: string;
  sellIn: number;
  quality: number;
  type: Types;
}

export enum Types {
  AGED,
  NORMAL,
  LEGENDARY,
  TICKETS,
}

export interface Item {
  id: number;
  name: string;
  sellIn: number;
  quality: number;
  type: Type;
}

export enum Type {
  AGED,
  NORMAL,
  LEGENDARY,
  TICKETS,
}

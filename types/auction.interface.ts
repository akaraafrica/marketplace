import { IItem } from "./item.interface";

export interface IAuction {
  id: number;
  open: boolean;
  startTime: Date;
  endTime: Date;
  openPrice: number;
  itemId: number;
  item: IItem;
}

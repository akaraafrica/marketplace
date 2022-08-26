import { IItem } from "./item.interface";

export interface IAuction {
  id: number;
  open: boolean;
  startDate: Date;
  endData: Date;
  openPrice: number;
  itemId: number;
  item: IItem;
}

import { IAbstract } from "./abstract.interface";

export interface ITransaction extends IAbstract {
  name: string;
  description: string;
}

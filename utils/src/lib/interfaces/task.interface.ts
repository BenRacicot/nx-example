import { IAbstract } from "./abstract.interface";
import { IAgent } from "./agent.interface";
import { ITransaction } from "./transaction.interface";

export interface ITask extends IAbstract {
  name: string;
  description: string;
  agent?: IAgent;
  transaction: ITransaction;
}

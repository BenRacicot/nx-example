export interface ITask {
  id: string;
  name: string;
  description: string;
  // ...
  agent?: {
    id: string;
    // ...
  };
  transaction: {
    id: string;
    // ...
  };
}

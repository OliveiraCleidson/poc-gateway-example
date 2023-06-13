import { LiveContract } from '../contracts/live.contract';
import { StudentsContract } from '../contracts/students.contract';

export type ApiConfig = {
  name: string;
  id: string;
  contracts: {
    live: boolean;
    students: boolean;
  };
  operations: {
    live: LiveContract;
    students: StudentsContract;
  };
};

import { ApiConfig } from '../contracts/api.contract';
import { LiveContract } from '../contracts/live.contract';
import { StudentsContract } from '../contracts/students.contract';

export class WiseUpOnlineApi implements ApiConfig {
  name: string;
  id: string;
  contracts: { live: boolean; students: boolean };
  operations: { live: LiveContract; students: StudentsContract };

  constructor() {
    this.name = 'WiseUp Online';
    this.id = 'wiseup-online';
    this.contracts = {
      live: true,
      students: true,
    };
    this.operations = <any>{};
  }
}

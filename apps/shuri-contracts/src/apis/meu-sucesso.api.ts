import { ApiConfig } from '../contracts/api.contract';
import { LiveContract } from '../contracts/live.contract';
import { StudentsContract } from '../contracts/students.contract';

export class MeuSucessoApi implements ApiConfig {
  name: string;
  id: string;
  contracts: { live: boolean; students: boolean };
  operations: { live: LiveContract; students: StudentsContract };

  constructor() {
    this.name = 'MeuSucesso';
    this.id = 'meu-sucesso';
    this.contracts = {
      live: false,
      students: true,
    };
    this.operations = <any>{};
  }
}

import { WiseUpOnlineApi } from './apis/live.api';
import { MeuSucessoApi } from './apis/meu-sucesso.api';
import { ApiConfig } from './contracts/api.contract';
import { liveFakeFactory } from './fakes/live.fake';
import { StudentsContractFake } from './fakes/students.fake';
import { ApiMap } from './types';

export function apiFactory(): ApiMap {
  const apiMap = new Map<string, ApiConfig>();

  const wiseUpOnlineApi: ApiConfig = createWiseUp();
  apiMap.set(wiseUpOnlineApi.id, wiseUpOnlineApi);

  const ms: ApiConfig = createMeuSucesso();
  apiMap.set(ms.id, ms);

  return apiMap;
}

function createWiseUp() {
  const wiseUpOnlineApi: ApiConfig = new WiseUpOnlineApi();
  wiseUpOnlineApi.operations.live = liveFakeFactory();

  const students = new StudentsContractFake();
  students.students.push({
    id: '1',
    email: 'maria-doe@teste.com',
  });

  wiseUpOnlineApi.operations.students = students;

  return wiseUpOnlineApi;
}

function createMeuSucesso() {
  const msApi: ApiConfig = new MeuSucessoApi();

  const students = new StudentsContractFake();
  students.students.push({
    id: '1',
    email: 'john-doe@teste.com',
  });

  msApi.operations.students = students;

  return msApi;
}

import {
  LiveContract,
  StudentPresenceListItem,
} from '../contracts/live.contract';

type ClassContract = LiveContract['class'];

export class ClassFake implements ClassContract {
  presenceListItems: StudentPresenceListItem[] = [
    {
      id: '1',
      email: 'other@teste.com',
    },
  ];

  presenceList(_classId: string): Promise<StudentPresenceListItem[]> {
    return Promise.resolve([...this.presenceListItems]);
  }
}

export function liveFakeFactory(): LiveContract {
  return {
    class: new ClassFake(),
  };
}

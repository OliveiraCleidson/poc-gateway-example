import {
  StudentListItem,
  StudentsContract,
} from '../contracts/students.contract';

export class StudentsContractFake implements StudentsContract {
  public students: StudentListItem[] = [];

  list(): Promise<StudentListItem[]> {
    return Promise.resolve([...this.students]);
  }
}

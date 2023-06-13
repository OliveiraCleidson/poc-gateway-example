export type StudentListItem = {
  id: string;
  email: string;
};

export type StudentsContract = {
  list(): Promise<StudentListItem[]>;
};

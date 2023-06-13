export type StudentPresenceListItem = {
  id: string;
  email: string;
};

export type LiveContract = {
  class: {
    presenceList(classId: string): Promise<StudentPresenceListItem[]>;
  };
};

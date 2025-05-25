export interface Task {
  id: number;
  content: string;
  completed: boolean;
  createdAt: string;
}

export interface TodoData {
  nextId: number;
  tasks: Task[];
}

export type Command = 'add' | 'list' | 'complete' | 'delete' | 'help';

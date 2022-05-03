import create from "zustand";
import { generateId } from "../helpers";

// тут мы определяем 2 интерфейса
interface Task {
  id: string;
  title: string;
  createdAt: number;
}

interface ToDoStore {
  tasks: Task[];
  createTask: (title: string) => void;
  updateTask: (id: string, title: string) => void;
  removeTask: (id: string) => void;
}
// создали store
export const useToDoStore = create<ToDoStore>((set, get) => ({
  tasks: [
      {
          id:'hsidvdvdfbvfb',
          title:'Моя дефолтная таска',
          createdAt:232342
      },
      {
        id:'hsidvdvdfbv',
        title:'Моя дефолтная таска2',
        createdAt:232342
    },
  ],
  createTask: (title) => {
    const { tasks } = get();
    //создаю новую задачу и соответственно новый state
    const newTask = {
      id: generateId(),
      title,
      createdAt: Date.now(),
    }
    // беру массив элементов и присоединяю с помощью concat задачи
    set({
      tasks: [newTask].concat(tasks),
    })
  },
  updateTask: (id: string, title: string) => {
    const { tasks } = get();
    set({
      tasks: tasks.map((task) => ({
        ...task,
        title: task.id === id ? title : task.title,
      }))
    });
  },
  removeTask: (id:string) => {
    const { tasks } = get();
    set({
      tasks: tasks.filter((task) => task.id !== id )
    });
  },
}));

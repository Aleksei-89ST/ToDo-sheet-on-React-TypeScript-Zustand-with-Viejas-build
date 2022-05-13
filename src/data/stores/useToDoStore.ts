import create, { State, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
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
function isToDoStore(object: any): object is ToDoStore {
  return "tasks" in object;
}

const lokalStorageUpdate =
  <T extends State>(config: StateCreator<T>): StateCreator<T> =>
  (set, get, api) =>
    config(
      (nextState, ...args) => {
        if (isToDoStore(nextState)) {
          window.localStorage.setItem("tasks", JSON.stringify(nextState.tasks));
        }
        set(nextState, ...args); // это мидлвара оперирунт на более верхнем уровне над нашим state
      },
      get,
      api
    );
const getCurrentState = () => {
  try {
    const currentState = JSON.parse(
      window.localStorage.getItem("tasks") || "[]"
    ) as Task[];
    return currentState;
  } catch (err) {
    window.localStorage.setItem("tasks", "[]");
  }
  return [];
};

// создали store
export const useToDoStore = create<ToDoStore>(
  lokalStorageUpdate(
    devtools((set, get) => ({
      tasks: getCurrentState(),
      createTask: (title) => {
        const { tasks } = get();
        //создаю новую задачу и соответственно новый state
        const newTask = {
          id: generateId(),
          title,
          createdAt: Date.now(),
        };
        // беру массив элементов и присоединяю с помощью concat задачи
        set({
          tasks: [newTask].concat(tasks),
        });
      },
      updateTask: (id: string, title: string) => {
        const { tasks } = get();
        set({
          tasks: tasks.map((task) => ({
            ...task,
            title: task.id === id ? title : task.title,
          })),
        });
      },
      removeTask: (id: string) => {
        const { tasks } = get();
        set({
          tasks: tasks.filter((task) => task.id !== id),
        });
      },
    }))
  )
);

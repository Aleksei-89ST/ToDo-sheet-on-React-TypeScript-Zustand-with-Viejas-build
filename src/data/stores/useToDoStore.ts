import create from 'zustand'
import {generateId} from '../helpers'


// тут мы определяем 2 интерфейса
interface Task {
    id:string;
    title:string;
    createdAt:Number;
}

interface ToDoStore {
    tasks:[];
    createTask:(title:string) => void;
    updateTask:(id:string,title:string) => void;
    removeTask:(id:string) => void;
}
// создали store
export const useToDoStore = create<ToDoStore>((set,get) => ({
tasks:[],
createTask:(title) => {
    const {tasks} = get();
    //создаю новую задачу и соответственно новый state
 const newTask = {
     id:generateId(),
     title,
     createdAt:Date.now(),
 }
 set({
     // беру массив элементов и присоединяю с помощью concat задачи
     tasks:[newTask].concat(tasks),
 })
},
updateTask:(id,title) => {},
removeTask:(id) => {},
}))
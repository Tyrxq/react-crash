import {useState , useEffect} from 'react';
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

function App() {
  
  // eslint-disable-next-line
  const [showAddTask,setShowAddTask] = useState(false);
  const [tasks,setTasks] = useState([]);
 

    useEffect(() => {
      const getTasks = async () => {
        const tasksFromServer = await fetchTask();
        setTasks(tasksFromServer);
      }
      getTasks();
    }, [])

    const fetchTasks = async (id) => {
      const res = await fetch(`http://localhost:5000/tasks/${id}`);
      const data = await res.json();
       return data;
    }
    const fetchTask = async () => {
      const res = await fetch(`http://localhost:5000/tasks`);
      const data = await res.json();
       return data;
    }

    const addTask = async(task) => {
      const res = await fetch('http://localhost:5000/tasks', 
      {
       method: 'POST',
       headers : {'Content-Type': 'application/json'},
       body : JSON.stringify(task)
      })

      const data = await res.json();
      setTasks([...tasks,data]);
      //const id = Math.floor(Math.random() * 100) + 1
      //const newTask = {id, ...task};
      //setTasks([...tasks,newTask])
    }

    //Delete
    const deleteTask = async(id) => {
      await fetch(`http://localhost:5000/tasks/${id}`, {method : 'DELETE'});
      setTasks(tasks.filter((task => task.id !== id)));
    }

    const toggleReminder = async(id) => {
      const taskToToggle = await fetchTasks(id)
      const updateTask = await{...taskToToggle,reminder: !taskToToggle.reminder}
      
      const res = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        } ,
        body: JSON.stringify(updateTask)
      })
      const data = await res.json();

      setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder}: task));
      console.log("toggle",id);
    }



  return (
    <div className="container">
     <Header onAdd = {() => setShowAddTask(!showAddTask)} showAdd = {showAddTask} />
     {showAddTask && <AddTask onAdd = {addTask} />}
     <Tasks tasks = {tasks} onDelete = {deleteTask} onToggle = {toggleReminder}/>
    </div>
  );
}

export default App;

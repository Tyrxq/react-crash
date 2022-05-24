import {useState} from 'react';
import Header from "./components/Header";
import Tasks from "./components/Tasks"


function App() {
  
  // eslint-disable-next-line
  const [tasks,setTasks] = useState([
    {
        id: 1,
        text: 'Doctor Appointment',
        day: 'Feb 5th at 2:30pm',
        reminder: true
    },
    {
        id: 2,
        text: 'Meeting at School',
        day: 'Feb 6th at 1:30pm',
        reminder: true
    },
    {
        id: 3,
        text: 'Food Shopping at 2:30',
        day: 'Feb 5th at 2:30pm',
        reminder: false
    }])

    //Delete
    const deleteTask = (id) => {
      console.log('delete',id);
      setTasks(tasks.filter((task => task.id !== id)));
    }

    const toggleReminder = (id) => {
      setTasks(tasks.map((task) => task.id === id ? {...task, reminder: !task.reminder}: task));
      console.log("toggle",id);
    }



  return (
    <div className="container">
     <Header />
     <Tasks tasks = {tasks} onDelete = {deleteTask} onToggle = {toggleReminder}/>
    </div>
  );
}

export default App;

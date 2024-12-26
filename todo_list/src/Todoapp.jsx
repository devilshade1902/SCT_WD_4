import React, { useState } from 'react'

const Todoapp = () => {
    const [tasks, setTasks] = useState([]);
    const [taskText, setTaskText] = useState('');
    const [editIndex, setEditIndex] = useState(null);

    const addTask = () => {
        if (taskText.trim() === '') return;
        if (editIndex !== null) {
          const updatedTasks = [...tasks];
          updatedTasks[editIndex] = { ...updatedTasks[editIndex], text: taskText };
          setTasks(updatedTasks);
          setEditIndex(null);
        } else {
          setTasks([...tasks, { text: taskText, completed: false }]);
        }
        setTaskText('');
      };
    
      const toggleCompletion = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(updatedTasks);
      };
    
      const editTask = (index) => {
        setTaskText(tasks[index].text);
        setEditIndex(index);
      };
    
      const deleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
      };
    
    return (
        <div className="container mt-5">
        <div className="card shadow">
          <div className="card-header bg-primary text-white text-center">
            <h2>Todo App</h2>
          </div>
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-md-8">
                <input
                  type="text"
                  className="form-control"
                  value={taskText}
                  onChange={(e) => setTaskText(e.target.value)}
                  placeholder="Enter a new task"
                />
              </div>
              <div className="col-md-4">
                <button 
                  className="btn btn-primary btn-block" 
                  onClick={addTask}>
                  {editIndex !== null ? 'Update Task' : 'Add Task'}
                </button>
              </div>
            </div>
  
            <ul className="list-group">
              {tasks.map((task, index) => (
                <li key={index} className="list-group-item d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <input
                      type="checkbox"
                      className="m-2"
                      checked={task.completed}
                      onChange={() => toggleCompletion(index)}
                    />
                    <span className={`flex-grow-1 ${task.completed ? 'text-decoration-line-through text-muted' : ''}`}>
                      {task.text}
                    </span>
                  </div>
                  <div>
                    <button 
                      className="btn btn-warning btn-sm m-2" 
                      onClick={() => editTask(index)}>
                      Edit
                    </button>
                    <button 
                      className="btn btn-danger btn-sm" 
                      onClick={() => deleteTask(index)}>
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
}

export default Todoapp

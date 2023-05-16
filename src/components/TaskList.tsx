import { KeyboardEvent, useState } from 'react'

import '../styles/tasklist.scss'

import { FiEdit3, FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [editTaskInput, setEditTaskInput] = useState(false);
  const [taskIdToEdit, setTaskIdToEdit] = useState(0);
  const [updatedTaskTitle, setUpdatedTaskTitle] = useState('');

  function handleCreateNewTask() {
    if (newTaskTitle !== '') {
      const id = Number(Math.floor(Math.random() * 1000));

      const task = {
        id,
        title: newTaskTitle,
        isComplete: false
      };

      setTasks(content => [...tasks, task]);

      setNewTaskTitle('');
    }
  }

  function handleToggleTaskCompletion(id: number) {
    const taskIndex = tasks.findIndex((task) => task.id === id);

    const updateTasks = [...tasks];

    if (updateTasks[taskIndex].isComplete === false) {
      updateTasks[taskIndex].isComplete = true;
    } else {
      updateTasks[taskIndex].isComplete = false;
    }

    setTasks(updateTasks);
  }

  function handleRemoveTask(id: number) {
    const taskIndex = tasks.findIndex((task) => task.id === id);

    setTasks((tasks) => tasks.filter((_, index) => index !== taskIndex));
  }

  function handleShowEditTaskInput(id: number) {
    if (editTaskInput === false) {
      setEditTaskInput(true);
      setTaskIdToEdit(id);
    } else {
      setEditTaskInput(false);
      setTaskIdToEdit(0);
    }
  }

  function handleEditTask(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && updatedTaskTitle !== "") {
      const taskIndex = tasks.findIndex((task) => task.id === taskIdToEdit);

      const updateTasks = [...tasks];

      updateTasks[taskIndex].title = updatedTaskTitle;

      setTasks(updateTasks);

      setUpdatedTaskTitle('');
      setEditTaskInput(false);
      setTaskIdToEdit(0);
    }
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>

                {(editTaskInput && (task.id === taskIdToEdit)) && <input type="text" value={(updatedTaskTitle !== '') ? updatedTaskTitle : task.title} onChange={(e) => setUpdatedTaskTitle(e.target.value)} onKeyDown={handleEditTask} autoFocus />}

                {(!editTaskInput || !(task.id === taskIdToEdit)) && <p>{task.title}</p>}

              </div>

              <div>
                <button type="button" data-testid="edit-task-button" className="edit-task-button" onClick={() => handleShowEditTaskInput(task.id)}>
                  <FiEdit3 size={16} />
                </button>

                <button type="button" data-testid="remove-task-button" className="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                  <FiTrash size={16} />
                </button>
              </div>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}
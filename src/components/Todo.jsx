import { useState } from 'react';
import AddTaskFrom from './AddTaskForm';
import SearchTaskForm from './SearchTaskForm';
import TodoInfo from './TodoInfo';
import TodoList from './TodoList';

const Todo = () => {
    const [tasks, setTasks] = useState([
        { id: '1', title: 'Купить молоко', isDone: false },
        { id: '2', title: 'Погладить кота', isDone: true },
    ]);

    const [newTaskTitle, setNewTaskTitle] = useState('');

    const deleteAllTasks = () => {
        const isConfirmed = confirm('Are you sure you want to delete all tasks?')

        if (isConfirmed) {
            setTasks([])
        }
    };

    const deleteTask = (taskId) => {
        console.log(taskId, tasks.filter((task) => task.id !== taskId))
        setTasks(tasks.filter((task) => task.id !== taskId))
    };

    const toggleTaskComplete = (taskId, isDone) => {
        setTasks(
            tasks.map((task) => {
                if (task.id === taskId) {
                    return {...task, isDone}
                }

                return task
            })
        )
    };

    const filterTasks = (query) => {
        console.log(`Search: ${query}`);
    };

    const addTask = () => {
        console.log('Added new task')

        if (newTaskTitle.trim().length > 0) {
            const newTask = {
                id: crypto?.randomUUID() ?? Date.now().toString(),
                title: newTaskTitle,
                isDone: false
            }

            setTasks([...tasks, newTask])
            setNewTaskTitle('')
        }
    };

    return (
        <div className="todo">
            <h1 className="todo__title">To Do List</h1>
            <AddTaskFrom
                addTask={addTask}
                newTaskTitle={newTaskTitle}
                setNewTaskTitle={setNewTaskTitle}
            />
            <SearchTaskForm onSearchInput={filterTasks} />
            <TodoInfo
                total={tasks.length}
                done={tasks.filter(({ isDone }) => isDone).length}
                onDeleteButtonClick={deleteAllTasks}
            />
            <TodoList
                tasks={tasks}
                onDeleteTaskButtonClick={deleteTask}
                onTaskCompleteChange={toggleTaskComplete}
            />
        </div>
    );
};

export default Todo;

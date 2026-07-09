import { useState, useEffect, use } from 'react';
import AddTaskFrom from './AddTaskForm';
import SearchTaskForm from './SearchTaskForm';
import TodoInfo from './TodoInfo';
import TodoList from './TodoList';

const Todo = () => {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');

        if (savedTasks) {
            return JSON.parse(savedTasks);
        }

        return [
            { id: '1', title: 'Купить молоко', isDone: false },
            { id: '2', title: 'Погладить кота', isDone: true },
        ];
    });

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [filterQuery, setFilterQuery] = useState('');

    const deleteAllTasks = () => {
        const isConfirmed = confirm(
            'Are you sure you want to delete all tasks?',
        );

        if (isConfirmed) {
            setTasks([]);
        }
    };

    const deleteTask = (taskId) => {
        console.log(
            taskId,
            tasks.filter((task) => task.id !== taskId),
        );
        setTasks(tasks.filter((task) => task.id !== taskId));
    };

    const toggleTaskComplete = (taskId, isDone) => {
        setTasks(
            tasks.map((task) => {
                if (task.id === taskId) {
                    return { ...task, isDone };
                }

                return task;
            }),
        );
    };

    const addTask = () => {
        if (newTaskTitle.trim().length > 0) {
            const newTask = {
                id: crypto?.randomUUID() ?? Date.now().toString(),
                title: newTaskTitle,
                isDone: false,
            };

            setTasks([...tasks, newTask]);
            setNewTaskTitle('');
            setFilterQuery('')
        }
    };

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const clearFilterQuery = filterQuery.trim().toLowerCase();

    const filteredTasks =
        clearFilterQuery.length > 0
            ? tasks.filter(({ title }) =>
                  title.toLowerCase().includes(clearFilterQuery),
              )
            : null;

    return (
        <div className="todo">
            <h1 className="todo__title">To Do List</h1>
            <AddTaskFrom
                addTask={addTask}
                newTaskTitle={newTaskTitle}
                setNewTaskTitle={setNewTaskTitle}
            />
            <SearchTaskForm
                filterQuery={filterQuery}
                setFilterQuery={setFilterQuery}
            />
            <TodoInfo
                total={tasks.length}
                done={tasks.filter(({ isDone }) => isDone).length}
                onDeleteButtonClick={deleteAllTasks}
            />
            <TodoList
                tasks={tasks}
                filteredTasks={filteredTasks}
                onDeleteTaskButtonClick={deleteTask}
                onTaskCompleteChange={toggleTaskComplete}
            />
        </div>
    );
};

export default Todo;

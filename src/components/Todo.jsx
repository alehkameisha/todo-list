import { useState, useEffect, useRef } from 'react';
import AddTaskFrom from './AddTaskForm';
import SearchTaskForm from './SearchTaskForm';
import TodoInfo from './TodoInfo';
import TodoList from './TodoList';
import Button from './Button';

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

    const newTaskInputRef = useRef(null);
    const firstIncompleteTaskRef = useRef(null);
    const firstIncompleteTaskId = tasks.find(({ isDone }) => !isDone)?.id;

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
        console.log('New task input ref:', newTaskInputRef);

        if (newTaskTitle.trim().length > 0) {
            const newTask = {
                id: crypto?.randomUUID() ?? Date.now().toString(),
                title: newTaskTitle,
                isDone: false,
            };

            setTasks([...tasks, newTask]);
            setNewTaskTitle('');
            setFilterQuery('');
            newTaskInputRef.current.focus();
        }
    };

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        newTaskInputRef.current.focus();
    }, []);

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
                newTaskInputRef={newTaskInputRef}
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
            <Button
                onClick={() =>
                    firstIncompleteTaskRef.current?.scrollIntoView({
                        behaviour: 'smooth',
                    })
                }
            >
                Show frils incomplite task
            </Button>
            <TodoList
                tasks={tasks}
                filteredTasks={filteredTasks}
                firstIncompleteTaskId={firstIncompleteTaskId}
                firstIncompleteTaskRef={firstIncompleteTaskRef}
                onDeleteTaskButtonClick={deleteTask}
                onTaskCompleteChange={toggleTaskComplete}
            />
        </div>
    );
};

export default Todo;

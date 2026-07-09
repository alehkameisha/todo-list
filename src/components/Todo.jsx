import { useState, useEffect, useRef, useCallback, use, useMemo } from 'react';
import AddTaskFrom from './AddTaskForm';
import SearchTaskForm from './SearchTaskForm';
import TodoInfo from './TodoInfo';
import TodoList from './TodoList';
import Button from './Button';

const Todo = () => {
    console.log('Todo');
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

    const deleteAllTasks = useCallback(() => {
        const isConfirmed = confirm(
            'Are you sure you want to delete all tasks?',
        );

        if (isConfirmed) {
            setTasks([]);
        }
    }, []);

    const deleteTask = useCallback(
        (taskId) => {
            console.log(
                taskId,
                tasks.filter((task) => task.id !== taskId),
            );
            setTasks(tasks.filter((task) => task.id !== taskId));
        },
        [tasks],
    );

    const toggleTaskComplete = useCallback(
        (taskId, isDone) => {
            setTasks(
                tasks.map((task) => {
                    if (task.id === taskId) {
                        return { ...task, isDone };
                    }

                    return task;
                }),
            );
        },
        [tasks],
    );

    const addTask = useCallback(() => {
        if (newTaskTitle.trim().length > 0) {
            const newTask = {
                id: crypto?.randomUUID() ?? Date.now().toString(),
                title: newTaskTitle,
                isDone: false,
            };

            setTasks((prevTasks) => [...prevTasks, newTask]);
            setNewTaskTitle('');
            setFilterQuery('');
            newTaskInputRef.current.focus();
        }
    }, [newTaskTitle]);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        newTaskInputRef.current.focus();
    }, []);

    const filteredTasks = useMemo(() => {
        const clearFilterQuery = filterQuery.trim().toLowerCase();

        return clearFilterQuery.length > 0
            ? tasks.filter(({ title }) =>
                  title.toLowerCase().includes(clearFilterQuery),
              )
            : null;
    }, [filterQuery, tasks]);

    const doneTasks = useMemo(() => {
        return tasks.filter(({ isDone }) => isDone).length;
    }, [tasks]);

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
                done={doneTasks}
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

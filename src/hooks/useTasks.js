import {
    useContext,
    useState,
    useRef,
    useMemo,
    useCallback,
    useEffect,
} from 'react';
import useTasksLocalStorage from './useTasksLocalStorage';

const useTasks = () => {
    const { savedTasks, saveTasks } = useTasksLocalStorage();

    const [tasks, setTasks] = useState(
        savedTasks ?? [
            { id: '1', title: 'Купить молоко', isDone: false },
            { id: '2', title: 'Погладить кота', isDone: true },
        ],
    );

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [filterQuery, setFilterQuery] = useState('');

    const newTaskInputRef = useRef(null);

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
        saveTasks(tasks);
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

    return {
        tasks,
        filteredTasks,
        deleteTask,
        deleteAllTasks,
        toggleTaskComplete,
        newTaskTitle,
        setNewTaskTitle,
        filterQuery,
        setFilterQuery,
        newTaskInputRef,
        addTask,
    };
};

export default useTasks;

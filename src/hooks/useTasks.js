import {
    useContext,
    useState,
    useRef,
    useMemo,
    useCallback,
    useEffect,
} from 'react';
import tasksAPI from '../api/tasksAPI';

const useTasks = () => {
    const [tasks, setTasks] = useState([]);

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [filterQuery, setFilterQuery] = useState('');

    const newTaskInputRef = useRef(null);

    const deleteAllTasks = useCallback(() => {
        const isConfirmed = confirm(
            'Are you sure you want to delete all tasks?',
        );

        if (isConfirmed) {
            tasksAPI.deleteAll(tasks).then(() => setTasks([]));
        }
    }, [tasks]);

    const deleteTask = useCallback(
        (taskId) => {
            tasksAPI.delete(taskId).then(() => {
                setTasks(tasks.filter((task) => task.id !== taskId));
            });
        },
        [tasks],
    );

    const toggleTaskComplete = useCallback(
        (taskId, isDone) => {
            tasksAPI.update(taskId, isDone).then(() => {
                setTasks(
                    tasks.map((task) => {
                        if (task.id === taskId) {
                            return { ...task, isDone };
                        }
                        return task;
                    }),
                );
            });
        },
        [tasks],
    );

    const addTask = useCallback((title) => {
        const newTask = {
            title,
            isDone: false,
        };

        tasksAPI.add(newTask).then((addedTask) => {
            setTasks((prevTasks) => [...prevTasks, addedTask]);
            setNewTaskTitle('');
            setFilterQuery('');
            newTaskInputRef.current.focus();
        });
    }, []);

    useEffect(() => {
        newTaskInputRef.current.focus();

        tasksAPI.getAll().then(setTasks);
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

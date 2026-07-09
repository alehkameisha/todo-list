import { createContext } from 'react';
import useTasks from '../hooks/useTasks';
import useIncompleteTaskScroll from '../hooks/useIncompleteTaskSroll';

export const TaskContext = createContext({});

export const TasksProvider = (props) => {
    const { children } = props;

    const {
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
    } = useTasks();

    const { firstIncompleteTaskId, firstIncompleteTaskRef } =
        useIncompleteTaskScroll(tasks);

    return (
        <TaskContext.Provider
            value={{
                tasks,
                filteredTasks,
                firstIncompleteTaskId,
                firstIncompleteTaskRef,
                deleteTask,
                deleteAllTasks,
                toggleTaskComplete,
                newTaskTitle,
                setNewTaskTitle,
                filterQuery,
                setFilterQuery,
                newTaskInputRef,
                addTask,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

import { useContext } from 'react';
import AddTaskFrom from './AddTaskForm';
import SearchTaskForm from './SearchTaskForm';
import TodoInfo from './TodoInfo';
import TodoList from './TodoList';
import Button from './Button';
import { TaskContext } from '../context/TasksContext';

const Todo = () => {
    const { firstIncompleteTaskRef } = useContext(TaskContext);

    return (
        <div className="todo">
            <h1 className="todo__title">To Do List</h1>
            <AddTaskFrom />
            <SearchTaskForm />
            <TodoInfo />
            <Button
                onClick={() =>
                    firstIncompleteTaskRef.current?.scrollIntoView({
                        behaviour: 'smooth',
                    })
                }
            >
                Show frils incomplite task
            </Button>
            <TodoList />
        </div>
    );
};

export default Todo;

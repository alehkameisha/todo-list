import { useContext } from 'react';
import Button from './Button';
import Filed from './Field';
import { TaskContext } from '../context/TasksContext';

const AddTaskFrom = ()=> {
    const {
        addTask,
        newTaskTitle,
        newTaskInputRef,
        setNewTaskTitle,
    } = useContext(TaskContext)

    const onSubmit = (event) => {
        event.preventDefault();

        addTask();
    } 

    return (
        <form className="todo__form" onSubmit={onSubmit}>
            <Filed
                className="todo__filed"
                label="New task title"
                id="new-task"
                value={newTaskTitle}
                ref={newTaskInputRef}
                onInput={(event) => setNewTaskTitle(event.target.value)}
            />
            <Button type="submit">Add</Button>
        </form>
    );
};

export default AddTaskFrom;

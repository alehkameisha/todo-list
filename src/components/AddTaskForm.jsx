import { useContext, useState } from 'react';
import Button from './Button';
import Filed from './Field';
import { TaskContext } from '../context/TasksContext';

const AddTaskFrom = () => {
    const { addTask, newTaskTitle, newTaskInputRef, setNewTaskTitle } =
        useContext(TaskContext);

    const [error, setError] = useState('');

    const clearNewTaskTitle = newTaskTitle.trim();
    const isNewTaskTitleNotEmpty = clearNewTaskTitle.length > 0;

    const onSubmit = (event) => {
        event.preventDefault();

        if (isNewTaskTitleNotEmpty) {
            addTask(clearNewTaskTitle);
        }
    };

    const onInput = (event) => {
        const { value } = event.target;
        const clearValue = value.trim()
        const hasOnlySpaces = value.length > 0 && clearValue.length === 0

        setNewTaskTitle(value);
        setError(hasOnlySpaces ? 'The task can not be empty' : '')
    };

    return (
        <form className="todo__form" onSubmit={onSubmit}>
            <Filed
                className="todo__filed"
                label="New task title"
                id="new-task"
                error={error}
                value={newTaskTitle}
                ref={newTaskInputRef}
                onInput={onInput}
            />
            <Button type="submit" isDisabled={newTaskTitle.trim().length === 0}>
                Add
            </Button>
        </form>
    );
};

export default AddTaskFrom;

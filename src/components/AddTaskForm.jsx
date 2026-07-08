import Button from './Button';
import Filed from './Field';

const AddTaskFrom = (props)=> {
    const {
        addTask,
        newTaskTitle,
        setNewTaskTitle
    } = props

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
                onInput={(event) => setNewTaskTitle(event.target.value)}
            />
            <Button type="submit">Add</Button>
        </form>
    );
};

export default AddTaskFrom;

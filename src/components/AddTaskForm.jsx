import Button from './Button';
import Filed from './Field';

const AddTaskFrom = () => {
    return (
        <form className="todo__form">
            <Filed
                className="todo__filed"
                label="New task title"
                id="new-task"
            />
            <Button type="submit">Add</Button>
        </form>
    );
};

export default AddTaskFrom;

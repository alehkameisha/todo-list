import TodoItem from './TodoItem';

const TodoList = (props) => {
    const {
        tasks = [],
        filteredTasks,
        firstIncompleteTaskId,
        firstIncompleteTaskRef,
        onDeleteTaskButtonClick,
        onTaskCompleteChange,
    } = props;

    const hasTasks = tasks.length > 0;
    const isEmptyFilteredTasks = filteredTasks?.length === 0

    
    if (!hasTasks) {
        return <div className="todo__empty-message">There are no tasks yet</div>;
    }

    if(hasTasks && isEmptyFilteredTasks) {
        return <div className="todo__empty-message">Tasks no found</div>;
    }

    return (
        <ul className="todo__list">
            {(filteredTasks ?? tasks).map((task) => (
                <TodoItem
                    className="todo__item"
                    key={task.id}
                    {...task}
                    ref={task.id === firstIncompleteTaskId ? firstIncompleteTaskRef : null}
                    onDeleteTaskButtonClick={onDeleteTaskButtonClick}
                    onTaskCompleteChange={onTaskCompleteChange}
                />
            ))}
        </ul>
    );
};

export default TodoList;

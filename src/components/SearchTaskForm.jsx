import { useContext } from 'react';
import Filed from './Field';
import { TaskContext } from '../context/TasksContext';

const SearchTaskForm = () => {
    const { 
        filterQuery,
        setFilterQuery
     } = useContext(TaskContext);

    return (
        <form
            className="todo__form"
            onSubmit={(event) => event.preventDefault()}
        >
            <Filed
                className="todo__field"
                label="Search task"
                id="search-task"
                type="search"
                value={filterQuery}
                onInput={(event) => setFilterQuery(event.target.value)}
            />
        </form>
    );
};

export default SearchTaskForm;

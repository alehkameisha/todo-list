import Filed from './Field';

const SearchTaskForm = (props) => {
    const { 
        filterQuery,
        setFilterQuery
     } = props;

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

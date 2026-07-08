import AddTaskFrom from './AddTaskForm';
import SearchTaskForm from './SearchTaskForm';
import TodoInfo from './TodoInfo';
import TodoList from './TodoList';

const Todo = () => {
    const tasks = [
        { id: '1', title: 'Купить молоко', isDone: false },
        { id: '2', title: 'Погладить кота', isDone: true },
    ]

    return (
        <div className="todo">
            <h1 className="todo__title">To Do List</h1>
            <AddTaskFrom />
            <SearchTaskForm />
            <TodoInfo 
                total={tasks.length}
                done={tasks.filter(({ isDone }) => isDone).length}
            />
            <TodoList tasks={tasks}/>
        </div>
    );
};

export default Todo;

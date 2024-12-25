import './App.css';
import React, {useState} from "react";

function App() {
    const [tab, setTab] = useState('All');
    const [todoList, setTodoList] = useState([]);
    const [todoName, setTodoName] = useState('');

    const filterTodo = tab === 'All' ? todoList : todoList.filter((todo) => todo.status === tab);
    const addTodo = () => {
        const todoInfo = {
            id: todoList.length + 1,
            name: todoName,
            status: 'Active'
        };

        setTodoList(prev => [...prev, todoInfo])
    }

    const handleConpleteTask = (id) => {
        setTodoList(prev => prev.map((todo) => todo.id === id ? {...todo, status: 'Complete'} : todo));
    }

    return (
        <div className="App">
            <div>
                <button onClick={() => setTab('All')}>All</button>
                <button onClick={() => setTab('Active')}>Active</button>
                <button onClick={() => setTab('Complete')}>Complete</button>
            </div>

            {tab === 'All' && (
                <div>
                    <div>
                        <label htmlFor="nameTodo">Todo Name</label>
                        <input type="text" id="nameTodo" onChange={(e) => setTodoName(e.target.value)}/>
                    </div>
                    <button onClick={addTodo}>Thêm</button>
                </div>
            )}

            {filterTodo.map((todo) => (
                <div key={todo.id} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <p style={{marginRight: '4px'}}>{todo.name}</p>
                    {todo.status === 'Active' ? <input type='radio' onClick={() => handleConpleteTask(todo.id)}/> : <input type="radio" checked={true} disabled={true}/>}
                </div>
            ))}
        </div>
    );
}

export default App;

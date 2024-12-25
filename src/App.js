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

        setTodoList(prev => [...prev, todoInfo]);
        setTodoName('');
    }

    const handleCompleteTask = (id) => {
        setTodoList(function(prev) {
            const updatedTodoList = prev.map(function(todo) {
                return todo.id === id ? 
                {
                    ...todo, 
                    status: 'Complete',
                } : 
                todo
            });

            console.log("Updated Todo List ", updatedTodoList)
            return updatedTodoList;
        });
    }

    const handleRemoveCompleteTodo = function() {
        setTodoList(function(prev) {
            const newTodoList = [];
            for (let todo of prev) {
                if (todo.status !== 'Complete') {
                    newTodoList.push(todo);
                }
            }
    
            // const newTodoList = prev.filter(function(todo) {
            //     return todo2.status !== 'Complete';
            // });
    
            return newTodoList;
        })
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
                        <input value={todoName} type="text" id="nameTodo" onChange={(e) => setTodoName(e.target.value)}/>
                    </div>
                    <button onClick={addTodo}>Thêm</button>
                </div>
            )}

            {filterTodo.map((todo) => (
                <div key={todo.id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <p style={{ marginRight: '4px' }}>{todo.name}</p>
                    {todo.status === 'Active' ? <input type='radio' onClick={() => handleCompleteTask(todo.id)} /> : <input type="radio" checked={true} disabled={true} />}
                </div>
            ))}

            {tab === 'Complete' && <button onClick={handleRemoveCompleteTodo}>Clear All</button>}
        </div>
    );
}

export default App;

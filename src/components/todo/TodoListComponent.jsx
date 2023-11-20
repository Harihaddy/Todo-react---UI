import { useEffect, useState } from "react"
import { deleteTodoApi, retriveAllTodosByUsernameApi } from "./api/TodosApi"
import { useAuth } from "./security/AuthContext"
import { useNavigate } from "react-router-dom"

export default function TodoListComponent() {
    
    const [todos, setTodos] = useState([])
    
    const [message, setMessage] = useState(null)
    
    const authContext = useAuth()
    
    const navigate = useNavigate()
    
    const username = authContext.username

    useEffect(() => refreshTodos(), [])

    function refreshTodos() {
        retriveAllTodosByUsernameApi(username)
            .then(response => {
                setTodos(response.data)

            })
            .catch(error => console.log(error))
    }

    function deleteById(id) {
        deleteTodoApi(username, id)
            .then(() => {
                setMessage(`Delete of todo with ${id} successfull`)
                refreshTodos()
            })
            .catch(error => console.log(error))
    }
    function updateTodo(id) {
        navigate(`/todo/${id}`)
    }
    function addTodo() {
        console.log("clicked")
        navigate(`/todo/-1`)
    }

    return (
        <div className='container'>
            <h1>Todo List</h1>
            {message && <div className="alert alert-warning">{message}</div>}
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Is Done?</th>
                            <th>TargetDate</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(
                                todo => (
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td >
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetDate.toString()}</td>
                                        <td><button className="btn btn-warning" onClick={() => deleteById(todo.id)}>Delete</button></td>
                                        <td><button className="btn btn-success" onClick={() => updateTodo(todo.id)}>Update</button></td>
                                    </tr>
                                )
                            )
                        }

                    </tbody>
                </table>
            </div>
            <div><button className="btn btn-success m-5" onClick={addTodo}>Add Todo</button></div>
        </div>
    )
}
import { Link} from "react-router-dom"
import { useState } from "react"
import { retriveHelloWorldPathVariable } from "./api/HelloWorldApi"
import { useAuth } from "./security/AuthContext"

export default function WelcomeComponent() {
    
    const [message, setMessage] = useState(null)
    const authContext=useAuth()
    const username=authContext.username
    function CallHelloWorldRestApi() {
        console.log("Called")
       
            retriveHelloWorldPathVariable('Haddy',authContext.Token)
            .then((response) => successFullResponse(response))
            .catch((error) => errorResponse(error))
            .finally(() => console.log('cleanUp'))
    }
    function successFullResponse(response) {
        console.log(response)
        setMessage(response.data.message)
    }
    function errorResponse(error) {
        console.log(error)
    }
    return (
        <>
            <div className='welcome'>
                <h1> Welcome {username}</h1>
                Manage your todo <Link to="/todos">Go hear</Link>
            </div>
            <div>
                <button className="btn btn-success m-5" onClick={CallHelloWorldRestApi}>Call Hello World</button>
                <h4 className="text-info">{message}</h4>
            </div>
        </>
    )
}
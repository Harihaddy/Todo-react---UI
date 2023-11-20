import { useNavigate, useParams } from "react-router-dom"
import { createTodoApi, retriveTodoApi, updateTodoApi } from "./api/TodosApi"
import { useAuth } from "./security/AuthContext"
import { useEffect, useState } from "react"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import moment from 'moment'
export default function TodoComponent() {
    const navigate = useNavigate()
    const { id } = useParams()
    const authContext = useAuth()
    const [description, setDescription] = useState('')
    const [targetDate, setTargetDate] = useState('')
    const username = authContext.username
    useEffect(
        () => retriveTodos(),
        [id]
    )
    function retriveTodos() {
        if(id != -1) {
            retriveTodoApi(username, id)
            .then(response => {
                setDescription(response.data.description)
                setTargetDate(response.data.targetDate)
            })
            .catch(error => console.log(error))
        }
    }
    function onSubmit(value) {
        const todo = {
            id: id,
            username: username,
            description: value.description,
            targetDate: value.targetDate,
            done: false
        }
        console.log(todo)
        if(id==-1) {
            createTodoApi(username, todo)
            .then(response => {
                navigate('/todos')
            })
            .catch(error => console.log(error))
    
        } else {
            updateTodoApi(username, id, todo)
            .then(response => {
                navigate('/todos')
            })
            .catch(error => console.log(error))
        }
    }
    function validate(value) {
        let error = {
            // description: 'Enter a valid description',
            // targetDate: 'Enter a valid target date'
        }
      
        if(value.description.length<5) {
            error.description = 'Enter atleast 5 characters'
        }

        if(value.targetDate == null || value.targetDate==''||!moment(value.targetDate).isValid()) {
            error.targetDate = 'Enter a target date'
        }
        return error
    }

    return (
        <div className="container">
            <h1>Enter Todo Details</h1>
            <div>
                <Formik initialValues={{ description, targetDate }}
                    enableReinitialize={true}
                    onSubmit={onSubmit}
                    validate={validate}
                validateOnBlur={false}
                validateOnChange={false}
                >
                    {
                        (props) => (
                            <Form >
                                <ErrorMessage
                                    name="description"
                                    component="div"
                                    className="alert alert-warning"
                                />
                                <ErrorMessage
                                    name="targetDate"
                                    component="div"
                                    className="alert alert-warning"
                                />
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field type="text" className="form-control" name="description" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field type="date" className="form-control" name="targetDate" />
                                </fieldset>
                                <div>
                                    <button className="btn btn-success m-5" type="submit" >Save</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>

            </div>
        </div>
    )
}
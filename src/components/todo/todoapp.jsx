
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './Todoapp.css'
import Login from './Login'
import WelcomeComponent from './WelcomeComponent'
import ErrorComponent from './ErrorComponent'
import TodoListComponent from './TodoListComponent'
import LogoutComponent from './LogoutComponent'
import HeaderComponent from './HeaderComponent'
import AuthProvider, { useAuth } from './security/AuthContext'
import TodoComponent from './TodoComponent'
export default function Todoapp() {

    function AuthenticatedRoute({ children }) {
        const authContext = useAuth()
        if (authContext.isAuthenticated)
            return children
        return <Navigate to="/" />
    }
   
    return (
        <div className="Todoapp">
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent />
                    <Routes>
                        <Route path='/' element={<Login />} />
                        <Route path='/login' element={<Login />} />

                        <Route path='/welcome/:username' element={
                            <AuthenticatedRoute>
                                <WelcomeComponent />
                            </AuthenticatedRoute>
                        } />

                        <Route path='/todos' element={
                            <AuthenticatedRoute>
                                <TodoListComponent />
                            </AuthenticatedRoute>
                        } />
                         <Route path='/todo/:id' element={
                            <AuthenticatedRoute>
                                <TodoComponent />
                            </AuthenticatedRoute>
                        } />

                        <Route path='/logout' element={
                            <AuthenticatedRoute>
                                <LogoutComponent />
                            </AuthenticatedRoute>
                        } />

                        <Route path='*' element={<ErrorComponent />} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>

        </div>
    )
}



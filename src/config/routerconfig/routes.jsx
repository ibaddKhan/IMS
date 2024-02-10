import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from '../../screens/signup'
import Login from '../../screens/login'
import Adminpanel from '../../screens/adminpanel'
import Allcourses from '../../screens/allcourses'
import AllStudent from '../../screens/allStudent'
import StudentsPage from '../../screens/studentsPage'

const Routers = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='signup' element={<Signup />} />
                    <Route path='/' element={<Login />} />
                    <Route path='adminpanel' element={<Adminpanel />} />
                    <Route path='allCourses' element={<Allcourses />} />
                    <Route path='allStudents' element={<AllStudent />} />
                    <Route path='studentsPage' element={<StudentsPage />} />
                </Routes>

            </BrowserRouter>
        </>
    )
}
export default Routers

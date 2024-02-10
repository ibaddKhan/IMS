import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from '../../screens/signup'
import Login from '../../screens/login'

const Routers = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='signup' element={<Signup />} />
                    <Route path='/' element={<Login />} />
                </Routes>

            </BrowserRouter>
        </>
    )
}
export default Routers
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AuthContext } from './context/AuthContext';

//Routes
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'

//Components
import { Navbar, Footer } from "./components"

//UserInterface Pages
import { Home, About, Register, Login, Ads, News } from "./pages/userInterface"

//Toast Container
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const App = () => {

    const [authState, setAuthState] = useState({
        email: "",
        id: 0,
        status: false,
    });

    useEffect(() => {
        axios.get("http://localhost:3001/auth/current_user", {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        }).then((response) => {
            if (response.data.error) {
                setAuthState({ ...authState, status: false });
            } else {
                setAuthState({
                    email: response.data.email,
                    id: response.data.id,
                    status: true,
                });
            }
        });
    }, [authState]);

    return (
        <>
            <AuthContext.Provider value={{ authState, setAuthState }}>

                <Router>
                    <ToastContainer />
                    <Routes>

                        <Route path="/" element={<WithNavbar authState={authState} />}>
                            <Route path='/' element={<Home />}></Route>
                            <Route path='/tazelikler' element={<News />}></Route>
                            <Route path='/reklamalar' element={<Ads />}></Route>
                            <Route path='/biz-barada' element={<About />}></Route>
                        </Route>

                        <Route path='/agza-bolmak' element={<Register />}></Route>
                        <Route path='/giris-etmek' element={<Login />}></Route>
                    </Routes>
                </Router>

            </AuthContext.Provider>
        </>
    );
}

const WithNavbar = ({ authState }) => {
    return (
        <>
            <Navbar authState={authState} />

            <Outlet />

            <Footer />
        </>
    );
}

export default App;

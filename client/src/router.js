import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './pages/login';
import ErrorPage from './pages/error';
import Register from './pages/register';
import Product from './pages/product';
import ProductList from './pages/product_list';
import Admin from './pages/admin';
const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/articles" element={<ProductList/>}/>
                <Route path="/articles/:id" element={<Product/>}/>
                <Route path="/admin" element={<Admin/>}/>
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
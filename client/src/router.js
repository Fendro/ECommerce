import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './pages/login';
import ErrorPage from './pages/error';
import Register from './pages/register';
import Article from './pages/article';
import ArticleList from './pages/article_list';
const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/articles" element={<ArticleList/>}/>
                <Route path="/articles/:idProduct" element={<Article/>}/>
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
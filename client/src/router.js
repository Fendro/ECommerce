import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./pages/login";
import ErrorPage from "./pages/error";
import Register from "./pages/register";
import Article from "./pages/article";
import ArticleList from "./pages/articleList";
import Admin from "./pages/admin";
import Change from "./pages/changer";
import AddArticle from "./pages/addArticle";
import AddUser from "./pages/addUser"
import AdminChange from "./pages/adminChange";
import ShoppingCart from "./pages/Shopcart";
import Delivery from "./pages/delivery";
import Final from "./pages/finalPage";

const AppRouter = () => {
    return (<Router>
        <Routes>
            <Route path="/" element={<ArticleList/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/articles" element={<ArticleList/>}/>
            <Route path="/articles/:id" element={<Article/>}/>
            <Route path="/admin" element={<Admin/>}/>
            <Route path="/change" element={<Change/>}/>
            <Route path="/admin/addArticle" element={<AddArticle/>}/>
            <Route path="/admin/addUser" element={<AddUser/>}/>
            <Route path="/admin/change/:id" element={<AdminChange/>}/>
            <Route path="/cart" element={<ShoppingCart/>}/>
            <Route path="/delivery" element={<Delivery/>}/>
            <Route path="/final" element={<Final/>}/>
            <Route path="*" element={<ErrorPage/>}/>
        </Routes>
    </Router>);
};

export default AppRouter;

import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import ErrorPage from "./pages/Error";
import Register from "./pages/Register";
import Article from "./pages/Article";
import ArticleList from "./pages/ArticleList";
import Admin from "./pages/Admin";
import Change from "./pages/Changer";
import AddArticle from "./pages/AddArticle";
import AddUser from "./pages/AddUser";
import AdminChange from "./pages/AdminChange";
import ShoppingCart from "./pages/Shopcart";
import Delivery from "./pages/Delivery";
import DeliveryForUser from "./pages/DeliveryForUser";
import Final from "./pages/FinalPage";
import Payment from "./pages/Payment";

const AppRouter = () => {
    return (
        <Router>
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
                <Route path="/deliveryForUser" element={<DeliveryForUser/>}/>
                <Route path="/payment" element={<Payment/>}/>
                <Route path="/final" element={<Final/>}/>
                <Route path="*" element={<ErrorPage/>}/>
            </Routes>
        </Router>
    );
};

export default AppRouter;

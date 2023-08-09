import Router from "./router";
import {useState} from "react";
import {UserContext} from "./context/UserContext";
import {ArticleContext} from "./context/articleContext";

function App() {
    const [user, setUser] = useState({});
    const [article, setArticle] = useState({});

    return (
        <div className="App">
            <ArticleContext.Provider value={{article, setArticle}}>
                <UserContext.Provider value={{user, setUser}}>
                    <Router/>
                </UserContext.Provider>
            </ArticleContext.Provider>
        </div>
    );
}

export default App;

import { useState } from 'react';
import Router from './router';
import { UserContext } from './context/UserContext';
import { EmailContext } from './context/EmailContext';
import { CheckContext } from './context/CheckContext';
import { IdContext } from './context/IdContext';

function App() {
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [check, setCheck] = useState("");
    const [id, setId] = useState("");
    return (
        <div className="App">
            <IdContext.Provider value={{ id, setId }}>
            <CheckContext.Provider value={{ check, setCheck }}>
            <UserContext.Provider value={{ admin: user, setAdmin: setUser }}>
                <EmailContext.Provider value={{ email, setEmail }}>
                    <Router />
                </EmailContext.Provider>
            </UserContext.Provider>
            </CheckContext.Provider>
            </IdContext.Provider>
        </div>
    );
}

export default App;

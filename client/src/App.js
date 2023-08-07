import { useState } from 'react';
import Router from './router';
import { UserContext } from './context/UserContext';
import { EmailContext } from './context/EmailContext';
import { CheckContext } from './context/CheckContext';

function App() {
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [check, setCheck] = useState("");
    return (
        <div className="App">
            <CheckContext.Provider value={{ check, setCheck }}>
            <UserContext.Provider value={{ admin: user, setAdmin: setUser }}>
                <EmailContext.Provider value={{ email, setEmail }}>
                    <Router />
                </EmailContext.Provider>
            </UserContext.Provider>
            </CheckContext.Provider>
        </div>
    );
}

export default App;

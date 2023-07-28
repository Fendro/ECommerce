import { useState } from 'react';
import Router from './router';
import { UserContext } from './context/UserContext';
import { EmailContext } from './context/EmailContext';

function App() {
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");

    return (
        <div className="App">
            <UserContext.Provider value={{ admin: user, setAdmin: setUser }}>
                <EmailContext.Provider value={{ email, setEmail }}>
                    <Router />
                </EmailContext.Provider>
            </UserContext.Provider>
        </div>
    );
}

export default App;

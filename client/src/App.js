import Router from "./router";
import { useState } from "react";
import { UserContext } from "./context/UserContext";

function App() {
  const [user, setUser] = useState({});

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <Router />
      </UserContext.Provider>
    </div>
  );
}

export default App;

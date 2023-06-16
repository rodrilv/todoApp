import { useState } from "react";
import "./App.css";
import { getLocalStorageUser } from "./helpers/getLocalStorageUser";
import { Router } from "./router/Router";

function App() {
  const [user, setUser] = useState(getLocalStorageUser());

  return (
    <>
      <Router />
    </>
  );
}

export default App;

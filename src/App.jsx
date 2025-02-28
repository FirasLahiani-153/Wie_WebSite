import { useState } from "react";
import "./App.css";
import "./index.css";
import Hero from "./Components/Hero";
import Navbar from "./Components/Navbar";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <main className=" min-h-screen w-screen overflow-x-hiden">
        <Navbar />
        <Hero />
      <h1>jkbjkh</h1>
      <h1>dsdgsdg</h1>
      <Hero />
      <Hero />
      <Hero />
      </main>
    </>
  );
}

export default App;

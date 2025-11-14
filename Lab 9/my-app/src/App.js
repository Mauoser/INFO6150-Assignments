import Home from "./components/home";
import Layout from "./components/layout";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Counter from "./components/counter";
import Card from "./components/card";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="counter" element={<Counter />}></Route>
          <Route path="card" element={<Card />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

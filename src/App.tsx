import { BrowserRouter, Route, Routes } from "react-router";
import { Homepage } from "./pages/Homepage";
import { AppLayout } from "./AppLayout";
import './App.css'
import { Lemmas } from "./pages/Lemmas";

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/lemmas" element={<Lemmas />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

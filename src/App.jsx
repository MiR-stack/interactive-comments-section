import { BrowserRouter, Route, Routes } from "react-router-dom";
import Messages from "./Comments/index";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Messages />} />
      </Routes>
    </BrowserRouter>
  );
}

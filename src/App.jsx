import { BrowserRouter, Route, Routes } from "react-router-dom";
import Notification from "./notification/notifications";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Notification />} />
      </Routes>
    </BrowserRouter>
  );
}

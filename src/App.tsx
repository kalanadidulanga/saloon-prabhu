import { Route, Routes } from "react-router";
import HomePage from "@/pages/home/HomePage";
import RootLayout from "./layouts/RootLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;

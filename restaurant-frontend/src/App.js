import './App.css';
import Forms from "./pages/FormsPage/Forms"
import Layout from "./pages/Layout"
import NoPage from "./pages/NoPage"
import {Toaster} from "react-hot-toast"

import RestoranteBranches from "./pages/BranchesPage/RestoranteBranches"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
<Routes>
    <Route path="/" element={<Layout />}>
    <Route index element={<RestoranteBranches />} />
    <Route path="forms" element={<Forms />} />
    <Route path="*" element={<NoPage />} />
  </Route>
    </Routes>
</BrowserRouter>
 <Toaster  position="top-left"
  reverseOrder={false}/>
    </div>
  );
}

export default App;

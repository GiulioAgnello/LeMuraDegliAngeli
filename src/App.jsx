import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import Homepage from "./pages/Homepage";
import Gallery from "./pages/Gallery";
import Story from "./pages/Story";
import Contacts from "./pages/Contacts";
import Sternatia from "./pages/Sternatia";
import Corigliano from "./pages/Corigliano";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/sternatia" element={<Sternatia />} />
            <Route path="/corigliano" element={<Corigliano />} />

            <Route path="/gallery" element={<Gallery />} />
            <Route path="/storia" element={<Story />} />
            <Route path="/contatti" element={<Contacts />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

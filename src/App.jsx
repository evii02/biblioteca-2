import { Routes, Route } from "react-router-dom";
import Hero from "./components/Hero.jsx";
import AuthorDesc from "./components/AuthorDesc.jsx";


function App() {
  return (
    <div className="max-w-[1000px] overflow-hidden m-auto pt-6">
 
      <Routes>
        {/* Ruta principal */}
        <Route path="/" element={<Hero/>} />
       
        <Route
          path="/autores"
          element={<Hero/>}
        />
        <Route
          path="/books"
          element={<Hero/>}
        />
        <Route
          path="/:name"
          element={<AuthorDesc/>}
        />
        {/* Ruta no encontrada */}
        <Route path="*" element={<div className="text-3xl text-center mt-5">404 - Página no encontrada</div>} />
      </Routes>
    </div>
  );
}

export default App;

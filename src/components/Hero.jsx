// src/App.jsx
import { useState, useEffect } from "react";
import Cards from "./Cards";
import CreateBookModal from "./CreateBookModal.jsx";
import { getAuthors } from "../middleware/authors.js";
import CardAuthor from "./CardAuthor";
import { envs } from "../config/envs.js";
import Nav from "./Nav.jsx";
import { GoPlusCircle } from "react-icons/go";
import { useLocation } from "react-router-dom";

const api = envs.API;
const baseUrl = envs.BASE_API;

function Hero() {
  const [books, setBooks] = useState([]);
  const [originalBooks, setOriginalBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [currentView, setCurrentView] = useState("books");
  const [authors, setAuthor] = useState([]);
  const location = useLocation()

  const path = location.pathname?.split()?.pop()

  console.log(path)
  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await fetch(`${api}/biblioteca`, {
          method: "GET",
          "Content-Type": "application/json",
        });
        const { data } = await res.json();
        setBooks(data);
        setOriginalBooks(data);
      } catch (error) {
        console.log(error);
        setBooks([]);
      }
    };
    getBooks();
  }, []);

  const handleFilter = (input) => {
    const value = input.target.value;

    if (value === "author") {
      setCurrentView(value);
      return;
    }

    if (value === "books") {
      setCurrentView(value);
      return;
    }

    const copy = [...originalBooks];

    if (value === "available") {
      setBooks(copy.filter((e) => e.avaliable));
    } else if (value === "not-available") {
      setBooks(copy.filter((e) => !e.avaliable));
    } else {
      setBooks(copy);
    }
  };

  const handleCreateBook = async (newBook) => {
    let urlImg = "";
    try {
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch(`${api}/upload`, {
        method: "POST",
        body: formData,
      });

      const { data } = await uploadRes.json();
      console.log(data);
      urlImg = data;
    } catch (error) {
      console.log("Error al subir la imagen:", error);
      return;
    }

    try {
      const bookData = {
        ...newBook,
        url: urlImg,
      };

      const createRes = await fetch(`${api}/biblioteca`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      const { data } = await createRes.json();

      setBooks((prev) => [data, ...prev]);
      setIsModalOpen(false);
    } catch (error) {
      console.log("Error al crear el libro:", error);
    }
  };

  useEffect(() => {
    if (currentView && currentView === "author") {
      getAuthors().then((res) => {
        setAuthor(res);
      });
    }
  }, [currentView]);

  useEffect(() => {
    if(path === '/autores') {
      setCurrentView('author')
      return 
    }

    setCurrentView('books')
  },[location, path])

  if (!authors?.length && !books?.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
        <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
          Cargando...
        </p>
      </div>
    );
  }

  

  return (
    <div className="max-w-[1000px] overflow-hidden m-auto ">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 dark:text-gray-100 mb-4">
        <span className="text-blue-500">Biblioteca</span>{" "}
        <span className="text-blue-500">O&M</span>
      </h1>

      <div className="pl-6 pr-6 flex items-center gap-2">
        <Nav/>
        <button
          onClick={() => setIsModalOpen(true)}
          className="p-2 rounded bg-green-500 flex items-center gap-2 flex-1"
        >
          <GoPlusCircle size={25}/>
          Crear libro
        </button>
      </div>

      <div className="flex justify-between items-center pl-6 pr-6 mt-4">
        <label className="flex gap-2 items-center" htmlFor="filter">
          <span>Filtros:</span>
          <select
            onChange={handleFilter}
            className="p-2 rounded"
            name="filter"
            id="filter"
          >
            <option disabled={currentView === "author"} value="all">
              Todos
            </option>
            <option disabled={currentView === "author"} value="available">
              Disponibles
            </option>
            <option disabled={currentView === "author"} value="not-available">
              No disponibles
            </option>
            {/* <option value="author">Autores</option>
            <option value="books">Libros</option> */}
          </select>
        </label>
        
      </div>

      {currentView === "books" ? (
        <Cards
          books={books.map((e) => {
            return { ...e, url: `${baseUrl}/${e.url}` };
          })}
        />
      ) : (
        <CardAuthor
          authors={authors?.map((e) => {
            return {
              ...e,
              img: `${baseUrl}/${e.img}`,
            };
          })}
        />
      )}

      <CreateBookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateBook}
        setLocalFile={setFile}
      />
    </div>
  );
}

export default Hero;

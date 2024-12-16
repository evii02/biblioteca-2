import { useEffect, useState } from "react";
import { getByName } from "../middleware/authors";
import { useNavigate, useParams } from "react-router-dom";
import { envs } from "../config/envs.js";
import { motion } from "framer-motion";

const baseApi = envs.BASE_API;

export default function AuthorDesc() {
  const { name } = useParams();
  const [author, setAuthor] = useState({});
  const navigate = useNavigate()

  console.log(name);
  useEffect(() => {
    if (name) {
      getByName(name).then((res) => setAuthor(res));
    }
  }, [name]);

  if (!author) {
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
    <>
       <div className="mb-5">
        <h3 className="text-4xl font-extrabold text-center text-gray-800 dark:text-gray-100">
          Biografia
        </h3>
      </div>
      <button
        onClick={() => navigate('/')}
        className="mb-5 px-4 py-2 ml-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      >
        Volver Atrás
      </button>
      <motion.div  initial={{ opacity: 0, y: 50 }} // Estado inicial
      animate={{ opacity: 1, y: 0 }} // Animación al montar
      exit={{ opacity: 0, y: -50 }} // Animación al desmontar
      transition={{ duration: 0.5, ease: "easeInOut" }}  className="ml-3 mr-3 rounded max-w-md mx-auto p-6 bg-white dark:bg-gray-800  shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <div className="flex items-center space-x-4">
          <img
            src={`${baseApi}/${author.img}`}
            alt={`Foto de ${author.name}`}
            className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
              {author.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {author.nationality}
            </p>
          </div>
        </div>
        <p className="mt-4 text-gray-700 dark:text-gray-300 text-justify">
          {author.biography}
        </p>
      </motion.div>
    </>
  );
}

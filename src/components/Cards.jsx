import { motion } from "framer-motion";

export default function Cards({ books }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
      {books?.map((book, index) => (
        <motion.div
          key={index}
          className="relative max-w-sm rounded-xl overflow-hidden bg-gradient-to-br from-gray-300 via-gray-700 to-gray-900 text-white shadow-lg hover:shadow-xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, delay: index * 0.1 },
          }}
          viewport={{ once: true }} // Se anima solo cuando entra una vez en el viewport
          whileHover={{
            scale: 1.05,
            boxShadow: "0 15px 25px rgba(0, 0, 0, 0.2)",
            transition: { duration: 0.3 },
          }}
        >
          {/* Imagen */}
          <div className="relative h-48">
            <img
              src={book?.url}
              alt={book?.title}
              className="absolute inset-0 w-full h-full object-cover rounded-t-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-xl"></div>
          </div>

          {/* Contenido */}
          <div className="p-6">
            <h2 className="text-xl font-bold mb-2">{book?.title}</h2>
            <p className="text-sm mb-4">{book?.description}</p>

            {/* Detalles */}
            <div className="text-xs space-y-1">
              <p>
                <span className="font-semibold">Autor: </span>
                {book?.autor?.name}
              </p>
              <p>
                <span className="font-semibold">Nacionalidad: </span>
                {book?.autor?.nationality}
              </p>
              <p>
                <span className="font-semibold">Fecha de lanzamiento: </span>
                {book?.release}
              </p>
              <p
                className={`mt-2 ${
                  book?.avaliable ? "text-green-300" : "text-red-400"
                }`}
              >
                {book?.avaliable ? "Disponible" : "No disponible"}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}


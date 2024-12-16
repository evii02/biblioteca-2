import { useState } from "react";
import { motion } from "framer-motion";

const CreateBookModal = ({ isOpen, onClose, onCreate, setLocalFile }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [nationality, setNationality] = useState("");
  const [release, setRelease] = useState("");
  const [available, setAvailable] = useState(true);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setLocalFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImageUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = {
      title,
      description,
      author: { name: author, nationality },
      avaliable: available,
      release,
      url: imageFile,
    };
    onCreate(newBook);

    setTitle("");
    setDescription("");
    setAuthor("");
    setNationality("");
    setRelease("");
    setImageUrl(null);
    setImageFile(null);
  };

  return (
    isOpen && (
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          onScroll={e => e.stopPropagation()}
          className="bg-gray-900 text-white p-6 shadow-2xl w-96 h-full overflow-auto"
          initial={{ opacity: 0, y: "-30%" }}
          animate={{
            opacity: 1,
            y: "0%",
            transition: { type: "spring", stiffness: 120, damping: 15 },
          }}
          exit={{ opacity: 0, y: "30%", transition: { duration: 0.4 } }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Crear nuevo libro
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium">
                Título
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="mt-1 w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium">
                Descripción
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows="4"
                className="mt-1 w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="author" className="block text-sm font-medium">
                Autor
              </label>
              <input
                type="text"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                className="mt-1 w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="nationality" className="block text-sm font-medium">
                Nacionalidad
              </label>
              <input
                type="text"
                id="nationality"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                required
                className="mt-1 w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="release" className="block text-sm font-medium">
                Fecha de lanzamiento
              </label>
              <input
                type="date"
                id="release"
                value={release}
                onChange={(e) => setRelease(e.target.value)}
                required
                className="mt-1 w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="imageUrl" className="block text-sm font-medium">
                Imagen
              </label>
              <input
                type="file"
                id="imageUrl"
                onChange={handleImageChange}
                accept="image/*"
                required
                className="mt-1 w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {imageUrl && (
                <div className="mt-2 text-center">
                  <img
                    src={imageUrl}
                    alt="Vista previa"
                    className="max-w-full h-48 object-cover rounded-lg border border-gray-700"
                  />
                </div>
              )}
            </div>

            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                checked={available}
                onChange={(e) => setAvailable(e.target.checked)}
                className="mr-2 focus:ring-blue-500"
              />
              <span className="text-sm">Disponible</span>
            </div>

            <div className="flex justify-between mt-6 gap-4">
              <button
                type="button"
                onClick={onClose}
                className="w-full px-4 py-2 bg-gradient-to-r from-red-500 to-red-700 rounded-lg text-white font-bold hover:opacity-90"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg text-white font-bold hover:opacity-90"
              >
                Crear
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    )
  );
};

export default CreateBookModal;

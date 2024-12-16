import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function CardAuthor({ authors }) {
  const navigate = useNavigate()

  const handleNavigate = (name) => {
    navigate(`/${name}`)
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {authors?.map((author, index) => (
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
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
            transition: { duration: 0.3 },
          }}
        >
          <img
            src={author?.img}
            alt={author?.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-6 flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              {author?.name}
            </h2>
            <span>Nacionalidad: {author.nationality}</span>
          <button onClick={() => handleNavigate(author.name)} className='p-2 rounded bg-blue-500 w-full'>Ver Biografia</button>
          </div>

        </motion.div>
      ))}
    </div>
  );
}

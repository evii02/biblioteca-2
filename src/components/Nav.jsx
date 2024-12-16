import { Link } from "react-router-dom";
import { PiBooks } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa";

export default function Nav() {
  return (
    <div className="flex items-center gap-2">
      <Link
        className="p-2 rounded flex items-center gap-2 bg-white text-black"
        to={"/books"}
      >
        <PiBooks size={25} />
        Books
      </Link>
      <Link
        className="p-2 rounded flex items-center gap-2 bg-blue-500"
        to={"/autores"}
      >
        <FaRegUser size={25} />
        Autores
      </Link>
    </div>
  );
}

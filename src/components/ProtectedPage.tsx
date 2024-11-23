import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProtectedPage = () => {
  return (
    <div className="max-w-xl mx-auto text-center pt-24 px-4 md:px-0 text-gray-800 dark:text-white">
      <FaLock className="mx-auto text-red-500" size={64} />
      <h1 className="text-2xl font-bold mb-4">This content isn't available right now</h1>
      <p className="text-lg leading-relaxed mb-8 text-gray-600 dark:text-gray-400">
        When this happens, it's usually because the owner only shared it with a small group of people, 
        changed who can see it, or it's been deleted.
      </p>
      <Link to="/" className="text-blue-500 text-lg hover:underline">
        Go to Home
      </Link>
    </div>
  );
};

export default ProtectedPage;

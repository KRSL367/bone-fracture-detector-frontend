import { FaExclamationCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotAvailPage = () => {
  return (
    <div className="max-w-xl mx-auto text-center pt-24 px-4 md:px-0 text-gray-800 dark:text-white">
      <FaExclamationCircle className="mx-auto text-red-500" size={64} />
      <h1 className="text-2xl font-bold mb-4">This Page Isn't Available</h1>
      <p className="text-lg leading-relaxed mb-8 text-gray-600 dark:text-gray-400">
        The link may be broken, or the page may have been removed. Check to see
        if the link you're trying to open is correct.
      </p>
      <Link to="/" className="text-blue-500 text-lg hover:underline">
        Go to Home
      </Link>
    </div>
  );
};

export default NotAvailPage;

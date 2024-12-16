import image from "../../images/image";
import { Link } from "react-router-dom";

const NotAccess = () => {
  return (
    <div className="min-h-[80vh] flex justify-center items-center bg-gray-100">
      <div className=" text-center">
        <img
          loading="lazy"
          className="w-40 h-auto drop-shadow-lg mx-auto"
          src={image.lockImage}
          alt="lock-images"
        />
        <h1 className="text-lg font-semibold text-red-600 mb-2">
          You don&apos;t have access to view this page
        </h1>
        <p className="text-sm text-gray-600 mb-10">
          Please contact the administrator if you think this is a mistake.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-primary text-white rounded-md shadow hover:bg-primary/80 transition duration-300 font-medium"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotAccess;

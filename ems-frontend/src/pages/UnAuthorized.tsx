import { FaUserLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

function UnAuthorized() {
  const authContext = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-600 from-50% to-gray-100 to-50% space-y-6 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="border shadow-lg w-50 bg-white rounded-lg p-5 flex flex-col items-center">
        <div className="text-red-500 text-8xl mb-3">
          <FaUserLock className="w-32 h-32" />
        </div>
        <hr className="border-t-2 border-teal-600 w-full" />

        <h1 className="text-5xl font-bold mt-6 text-center text-teal-600">
          Unauthorized Access
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-gray-600 text-center">
          You do not have permission to view this page. Please contact the
          administrator if you believe this is a mistake.
        </p>
        <button
          className="mt-6 px-8 py-3 text-lg bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
          onClick={() => navigate(`/${authContext?.user?.role}-dashboard`)}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}

export default UnAuthorized;

import { useLocation, useNavigate } from "react-router-dom";

const PhotoResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const photo = location.state?.photo;

  if (!photo) {
    return (
      <div className="min-h-screen">
        No Image Found
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <img
        src={photo}
        alt="Captured"
        className="max-w-lg rounded-xl shadow-lg"
      />

      <button
        onClick={() => navigate("/list")}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded"
      >
        Back to List
      </button>
    </div>
  );
};

export default PhotoResult;

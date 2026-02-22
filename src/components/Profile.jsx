import React,{useState,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Profile = () => {
    const { id } = useParams()
     const [image, setImage] = useState(null);
     const [formattedData, setFormattedData] = useState([]);
    const navigate=useNavigate()

      useEffect(() => {
        async function getData(params) {
          const data = await fetch("/api/backend_dev/gettabledata.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: "test",
              password: "123456",
            }),
          });
          const res = await data.json();
          // console.log("DATA", res.TABLE_DATA.data);
          const mapped = res.TABLE_DATA.data.map((item) => ({
            name: item[0],
            department: item[1],
            city: item[2],
            id: item[3],
            joinedAt: item[4],
            salary: Number(item[5].replace(/[$,]/g, "")),
          }));
          setFormattedData(mapped);
        }
        getData();
      }, []);
    //   console.log(formattedData)
    const emp = formattedData.filter((emp) => emp.id === id)[0];
    
    console.log(emp);
    const capturePhoto = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      const video = document.createElement("video");
      video.srcObject = stream;
      await video.play();

      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0);

      const photo = canvas.toDataURL("image/png");

      stream.getTracks().forEach((track) => track.stop());

      navigate("/photo", { state: { photo } });
    };
    return (
      <div className="relative">
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
          <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              {emp?.name}
            </h1>

            <p className="text-2xl text-gray-500 mb-8">{emp?.department}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xl">
              <div>
                <p className="text-gray-400 uppercase tracking-wide text-sm mb-1">
                  City
                </p>
                <p className="font-semibold text-gray-800">{emp?.city}</p>
              </div>

              <div>
                <p className="text-gray-400 uppercase tracking-wide text-sm mb-1">
                  Employee ID
                </p>
                <p className="font-semibold text-gray-800">{emp?.id}</p>
              </div>

              <div>
                <p className="text-gray-400 uppercase tracking-wide text-sm mb-1">
                  Joined Date
                </p>
                <p className="font-semibold text-gray-800">{emp?.joinedAt}</p>
              </div>

              <div>
                <p className="text-gray-400 uppercase tracking-wide text-sm mb-1">
                  Salary
                </p>
                <p className="text-3xl font-bold text-green-600">
                  ${emp?.salary?.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={capturePhoto}
          className="mt-8 bg-black text-white px-6 py-3 rounded absolute left-175 top-135 "
        >
          Capture Photo
        </button>
      </div>
    );
}

export default Profile
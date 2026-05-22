import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/util";

export default function FaceExpression() {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef = useRef(null);

  const [expression, setExpression] = useState("Detecting...");

  useEffect(() => {
    init({ landmarkerRef, videoRef, streamRef });

    return () => {
      if (landmarkerRef.current) {
        landmarkerRef.current.close();
      }

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center  space-y-4">
      <video
        className=" border-2 border-gray-300 w-full rounded-2xl shadow-md "
        ref={videoRef}
        playsInline
      />
      <div className="bootam flex  justify-between w-full items-center  space-y-4">
        {" "}
        <h2 className=" text-3xl text-white font-serif ">{expression}</h2>
        <button
          className=" bg-blue-700 bg-slate-600 px-4 py-3 rounded-xl text-teal-400 font-medium hover:scale-101 active:scale-90  transition-all duration-200"
          onClick={() => {
            detect({ landmarkerRef, videoRef, setExpression });
          }}
        >
          Detect expression
        </button>
      </div>
    </div>
  );
}

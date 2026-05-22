import React from "react";
import FaceExpression from "../../expression/component/FaceExpression.jsx";
import Player from "../components/player.jsx";

const Home = () => {
  return (
    <>
      <div className="space-y-10 h-full w-full flex bg-gray-900 gap-5 justify-around px-4 py-6">
        <div className="faceexpression w-1/2 ">
          <FaceExpression />
        </div>
        <div className="player w-1/2 ">
          <Player />
        </div>
      </div>
    </>
  );
};

export default Home;

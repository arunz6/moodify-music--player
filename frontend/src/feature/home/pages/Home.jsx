import React from "react";
import FaceExpression from "../../expression/component/FaceExpression.jsx";
import Player from "../components/player.jsx";

const Home = () => {
  return (
    <>
      <div className="space-y-10 px-4 py-6">
        <FaceExpression />
        <Player />
      </div>
    </>
  );
};

export default Home;

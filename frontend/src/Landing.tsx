import React from "react";
import LandingImage from "./assets/chess.jpg"
import Button from "./components/Button";
import {useNavigate} from "react-router-dom"

const Landing = () => {
    const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen flex p-20 bg-[#302E2B]">
      <div className="w-1/2 flex justify-center">
        <img src={LandingImage} width={"70%"} height={"40%"} />
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <div>
          <h1 className="text-3xl text-white capitalize">
            The best site to play chess on the internet
          </h1>
          <div className="flex flex-col">
            <Button onClick={()=>navigate("/game")}>
                Play 
            </Button> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;

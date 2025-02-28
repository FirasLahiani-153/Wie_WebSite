import React from "react";
import Button from "./Button";

const HeroLeftcomp = () => {
  return (
    <div className="flex flex-col justify-center items-start  ">
      <h1 className="font-righteous  text-[#ffffff] text-5xl textShadow" >
        <span className="  font-medium text-[80px] ">Women</span>
        <br />
        <span className=" font-medium text-[80px]">In</span>
        <br />
        <span className=" font-medium text-[80px]">Engineering</span>
      </h1>
      <h2 className="font-ropa text-[#ffffff] text-[50px] mt-1 font-[100]">
        ISIMS AFFINITY GROUP
      </h2>
      <p className="text-[#ffffff] text-lg leading-snug max-w-md mt-4 mb-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis .
      </p>
      <Button  text="MORE"  />
    </div>
  );
};

export default HeroLeftcomp;

import React from "react";
import Button from "./Button";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const HeroLeftcomp = () => {
  return (
    <div className="flex flex-col justify-center items-start h-full  2xl:ml-20 ml-10 mt-10 2xl:mt-0">
      <h1 className="font-righteous  text-[#ffffff] text-5xl textShadow ">
        <span className="  font-medium text-[80px] ">Women In</span>
        <br />

        <span className=" font-medium text-[80px]">Engineering</span>
      </h1>
      <h2 className="font-ropa text-[#ffffff] text-[50px] mt-1 font-[100]">
        ISIMS STUDENT AFFINITY GROUP
      </h2>
      <p className="text-[#ffffff] text-lg leading-snug max-w-md mt-4 mb-8">
      The IEEE ISIMS Student Affinity Group (SAG), established in 2022 under the IEEE ISIMS Student Branch, is a vibrant community dedicated to empowering, inspiring, and supporting students—especially women—in STEM fields. Through diverse initiatives, the group provides opportunities for leadership, professional development, and technical growth, while fostering a spirit of inclusivity and collaboration.
      </p>
      <Button text="Join Us " href="https://www.ieee.org/membership-catalog/productdetail/showProductDetailPage.html?product=MEMWIE050&searchResults=Y" />
    </div>
  );
};

export default HeroLeftcomp;

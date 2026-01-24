import React from "react";
import Button from "./Button";

const HeroLeftcomp = () => {
  return (
    <div className="flex flex-col justify-start items-start h-full w-full md:w-auto 2xl:ml-20 md:ml-10 ml-0 mt-0 px-4 md:px-0">
      <h1 className="font-righteous text-[#ffffff] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl textShadow">
        <span className="font-medium text-[40px] sm:text-[50px] md:text-[60px] lg:text-[70px] xl:text-[80px]">Women In</span>
        <br />
        <span className="font-medium text-[40px] sm:text-[50px] md:text-[60px] lg:text-[70px] xl:text-[80px]">Engineering</span>
      </h1>
      <h2 className="font-ropa text-[#ffffff] text-[20px] sm:text-[28px] md:text-[35px] lg:text-[42px] xl:text-[50px] mt-1 md:mt-2 font-[100]">
        ISIMS STUDENT AFFINITY GROUP
      </h2>
      <p className="text-[#ffffff] text-sm sm:text-base md:text-lg leading-snug max-w-full md:max-w-xl lg:max-w-2xl mt-3 md:mt-4 mb-4 md:mb-6">
        The IEEE ISIMS Student Affinity Group (SAG), established in 2022 under the IEEE ISIMS Student Branch, is a vibrant community dedicated to empowering, inspiring, and supporting students especially women in STEM fields. Through diverse initiatives, the group provides opportunities for leadership, professional development, and technical growth, while fostering a spirit of inclusivity and collaboration.
      </p>
      <Button text="Join Us " href="https://www.ieee.org/membership-catalog/productdetail/showProductDetailPage.html?product=MEMWIE050&searchResults=Y" />
    </div>
  );
};

export default HeroLeftcomp;

import React from 'react'

const Button = ({text}) => {
    return (
        <button
          className="bg-white text-[#742F8A] text-lg w-32 font-extrabold font-roboto py-2 px-5 rounded-full  hover:bg-[#E3E3E3] transition-colors duration-200"
        >
          {text}
        </button>
    );
};

export default Button
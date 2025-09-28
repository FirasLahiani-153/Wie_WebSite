import React from 'react'

const Button = ({text, href, onClick}) => {
    const handleSmoothScroll = (e) => {
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const targetPosition = targetElement.offsetTop - 100; // 100px offset from top
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 2000; // 2 seconds for slower animation
                let start = null;

                const animation = (currentTime) => {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                };

                const easeInOutQuad = (t, b, c, d) => {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                };

                requestAnimationFrame(animation);
            }
        }
    };

    if (href) {
        return (
            <a
                href={href}
                onClick={handleSmoothScroll}
                className="bg-white text-[#742F8A] text-lg w-32 font-extrabold font-roboto py-2 px-5 rounded-full hover:bg-[#E3E3E3] transition-colors duration-200 inline-block text-center cursor-pointer"
            >
                {text}
            </a>
        );
    }
    
    return (
        <button
            onClick={onClick}
            className="bg-white text-[#742F8A] text-lg w-32 font-extrabold font-roboto py-2 px-5 rounded-full hover:bg-[#E3E3E3] transition-colors duration-200"
        >
            {text}
        </button>
    );
};

export default Button
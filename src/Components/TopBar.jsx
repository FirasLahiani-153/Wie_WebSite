import React from 'react';

const TopBar = () => {
  const links = [
    { label: 'IEEE.org', href: 'https://www.ieee.org/' },
    { label: 'IEEE WIE.org', href: 'https://wie.ieee.org/' },
    { label: 'IEEE.ISIMS', href: 'https://isims.ieee.tn' }
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-[1002] bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-6 py-2 text-sm sm:text-base">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopBar; 
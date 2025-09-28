import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaLinkedin, FaFacebook, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Instagram', icon: <FaInstagram className="text-2xl text-[#E1306C] hover:text-[#833AB4] transition-colors duration-300" />, url: 'https://www.instagram.com/ieee_wie_isims' },
    { name: 'LinkedIn', icon: <FaLinkedin className="text-2xl text-[#0077B5] hover:text-[#005582] transition-colors duration-300" />, url: 'https://www.linkedin.com/company/ieee-wie-isims-student-affinity-group' },
    { name: 'Facebook', icon: <FaFacebook className="text-2xl text-[#1877F2] hover:text-[#0B5FBD] transition-colors duration-300" />, url: 'https://www.facebook.com/profile.php?id=100088426925351&mibextid=LQQJ4d' },
  ];

  const quickLinks = [
    { name: 'About', url: '#about' },
    { name: 'Activities', url: '#activities' },
    { name: 'Events', url: '#events' },
    { name: 'Growth', url: '#growth' },
    { name: 'Contact', url: '#contact' }
  ];

  return (
    <footer className="bg-[#742F8A]/80 relative overflow-hidden">
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent backdrop-blur-xl" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" style={{ animationDelay: '1s' }} />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/5 to-transparent" />
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mb-8">
          {/* About Section */}
          <div className="text-white text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">WIE ISIMS</h3>
            <p className="text-white/80 mb-4 text-sm md:text-base max-w-md mx-auto md:mx-0">
              Empowering women in engineering and technology through networking, mentorship, and professional development.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-white text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="inline-block md:block mx-2 md:mx-0"
                >
                  <a
                    href={link.url}
                    className="text-white/80 hover:text-white transition-colors duration-300 text-sm md:text-base"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-white text-center md:text-left col-span-1 sm:col-span-2 md:col-span-1">
            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center justify-center md:justify-start text-white/80">
                <span className="mr-2">📍</span>
                <span className="text-sm md:text-base">ISIMS, Sfax, Tunisia</span>
              </li>
              <li className="flex items-center justify-center md:justify-start text-white/80">
                <span className="mr-2">📧</span>
                <span className="text-sm md:text-base"> sba-isims-wie@ieee.org</span>
              </li>
              
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-6 md:pt-8 mt-6 md:mt-8">
          <p className="text-center text-white/60 text-sm md:text-base">
            © {currentYear} WIE ISIMS. All rights reserved. 
            <br /> Created by Firas Lahiani
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
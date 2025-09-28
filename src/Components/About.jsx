import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="min-h-screen bg-[#742F8A] py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">About WIE</h2>
          <p className="text-xl text-white/80">Empowering Women in Engineering</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
            <p className="text-white/90 leading-relaxed">
              To inspire, engage, and advance women in technical disciplines globally. We strive to create a supportive environment where women can thrive in STEM fields, fostering innovation and leadership.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
            <p className="text-white/90 leading-relaxed">
              To be the leading organization for women in engineering and technology, creating a world where women are equally represented and valued in STEM fields, driving innovation and positive change.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="md:col-span-2 bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Our Objectives</h3>
            <ul className="grid md:grid-cols-2 gap-4">
              <li className="flex items-start space-x-2">
                <span className="text-white text-xl">•</span>
                <p className="text-white/90">Promote gender diversity in STEM fields</p>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-white text-xl">•</span>
                <p className="text-white/90">Provide networking and mentorship opportunities</p>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-white text-xl">•</span>
                <p className="text-white/90">Organize workshops and technical training sessions</p>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-white text-xl">•</span>
                <p className="text-white/90">Support career development and leadership skills</p>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-white text-xl">•</span>
                <p className="text-white/90">Foster innovation and research collaboration</p>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-white text-xl">•</span>
                <p className="text-white/90">Create awareness about women's contributions in STEM</p>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About; 
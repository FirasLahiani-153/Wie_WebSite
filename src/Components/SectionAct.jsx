import React from 'react';
import SplitText from "./SplitText";
import CardAct from "./CardAct";
import { motion } from 'framer-motion';

const SectionAct = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="activities" className="w-screen min-h-screen bg-[#B08DB9] relative py-20 overflow-hidden">
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent backdrop-blur-sm" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <SplitText
            text="Our Activities"
            className="text-7xl md:text-8xl font-bold text-white textShadow"
            delay={0.1}
            animationFrom={{ opacity: 0, y: 20 }}
            animationTo={{ opacity: 1, y: 0 }}
            ease="back.out(1.7)"
          />
          <p className="text-xl text-white/80 mt-4 max-w-2xl mx-auto">
            Discover the exciting initiatives and events that make our WIE chapter unique
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 justify-items-center"
        >
          <motion.div variants={cardVariants}>
            <CardAct 
              path={"/assets/visits.png"} 
              title={"Visits"} 
              text={"WIE ISIMS organizes multiple educational visits throughout the year ,To support the youth and help them grow and let them grow within STEM fields."}
            />
          </motion.div>
          
          <motion.div variants={cardVariants}>
            <CardAct 
              path={"/assets/workshop.png"} 
              title={"Workshops"} 
              text={"Workshops? We have that too! WIE ISIMS organizes workshops like Entrepreneurship, leadership, and much more. We try our best to leave an impact by engaging more people with fun activities in different fields."}
            />
          </motion.div>
          
          <motion.div variants={cardVariants}>
            <CardAct 
              path={'/assets/team-building.png'} 
              title={"Team Building"} 
              text={"WIE ISIMS values the relationship with its members so we try to always gather and spend time together. Multiple meetings are being held every week to track the workflow."}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SectionAct;

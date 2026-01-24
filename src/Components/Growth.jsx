import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import SplitText from './SplitText';

const Growth = () => {
  const originalData = [
    { year: '2023', members: 141, label: '2023' },
    { year: '2024', members: 174, label: '2024' },
    { year: '2025', members: 210, label: '2025' }
  ];

  const [memberData, setMemberData] = useState([
    { year: '2023', members: 0, label: '2023' },
    { year: '2024', members: 0, label: '2024' },
    { year: '2025', members: 0, label: '2025' }
  ]);

  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Animate chart values when scrolled into view - year by year
  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true);
      const duration = 1500; // 1.5 seconds per year
      const steps = 60;
      const stepDuration = duration / steps;
      const delayBetweenYears = 800; // Delay between each year animation
      
      originalData.forEach((data, index) => {
        // Start each year's animation with a delay
        setTimeout(() => {
          const targetValue = data.members;
          const stepValue = targetValue / steps;
          let currentStep = 0;

          const interval = setInterval(() => {
            currentStep++;
            const currentValue = Math.min(stepValue * currentStep, targetValue);
            
            setMemberData(prev => {
              const newData = [...prev];
              newData[index] = { ...newData[index], members: Math.round(currentValue) };
              return newData;
            });

            if (currentStep >= steps) {
              clearInterval(interval);
              setMemberData(prev => {
                const newData = [...prev];
                newData[index] = { ...newData[index], members: targetValue };
                return newData;
              });
            }
          }, stepDuration);
        }, index * delayBetweenYears);
      });
    }
  }, [isVisible, hasAnimated]);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-lg p-3 shadow-xl">
          <p className="text-white font-semibold">{`Year: ${label}`}</p>
          <p className="text-white/90">
            <span className="text-[#B08DB9]">●</span> Members: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom dot component for the line
  const CustomDot = (props) => {
    const { cx, cy, payload } = props;
    const dotIndex = memberData.findIndex(d => d.year === payload?.year);
    // Dot appears near the end of each year's animation (after 1.2s of the 1.5s animation)
    const dotDelay = dotIndex >= 0 ? dotIndex * 0.8 + 1.2 : 0;
    return (
      <motion.circle
        cx={cx}
        cy={cy}
        r={6}
        fill="#B08DB9"
        stroke="#742F8A"
        strokeWidth={3}
        initial={{ scale: 0, opacity: 0 }}
        animate={isVisible && hasAnimated ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ 
          delay: dotDelay, 
          type: "spring", 
          stiffness: 200,
          damping: 15
        }}
        className="drop-shadow-lg"
      />
    );
  };

  return (
    <section id="growth" className="min-h-screen bg-gradient-to-br from-[#742F8A] via-[#8B4A9B] to-[#742F8A] relative py-12 sm:py-16 md:py-20 overflow-hidden">
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent backdrop-blur-sm" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-[#FFD700]/10 to-[#FFA500]/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-16"
        >
          <SplitText
            text="Our Growth"
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white textShadow"
            delay={0.1}
            animationFrom={{ opacity: 0, y: 20 }}
            animationTo={{ opacity: 1, y: 0 }}
            ease="back.out(1.7)"
          />
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 mt-4 max-w-2xl mx-auto px-4">
            Witness the remarkable journey of WIE ISIMS as we grow together in empowering women in STEM
          </p>
        </motion.div>

        {/* Growth Chart Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 md:p-8 border border-white/20 shadow-2xl"
        >
          <div className="mb-6 md:mb-8">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">Member Growth Over the Years</h3>
            <p className="text-sm sm:text-base text-white/70">Our growing community of empowered women in STEM</p>
          </div>

          {/* Year Display Cards */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mb-6 md:mb-8">
            {memberData.map((data, index) => (
              <motion.div
                key={data.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.8, duration: 0.6 }}
                className="bg-white/20 backdrop-blur-lg text-white px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-full border border-white/30 font-medium text-sm sm:text-base w-full sm:w-auto text-center"
              >
                {data.year}: {data.members} members
              </motion.div>
            ))}
          </div>

          {/* Chart */}
          <motion.div 
            className="h-64 sm:h-72 md:h-80 w-full overflow-x-auto"
            onViewportEnter={() => setIsVisible(true)}
            viewport={{ once: true, margin: "-100px" }}
          >
            <ResponsiveContainer width="100%" height="100%" minHeight={250}>
              <AreaChart
                data={memberData}
                margin={{ top: 10, right: 10, left: 5, bottom: 10 }}
              >
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#B08DB9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#B08DB9" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="label" 
                  stroke="white"
                  fontSize={12}
                  className="text-xs sm:text-sm"
                  tick={{ fill: 'white' }}
                />
                <YAxis 
                  stroke="white"
                  fontSize={12}
                  className="text-xs sm:text-sm"
                  tick={{ fill: 'white' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="members"
                  stroke="#B08DB9"
                  strokeWidth={3}
                  fill="url(#colorGradient)"
                  dot={<CustomDot />}
                  activeDot={{ r: 8, fill: "#B08DB9", stroke: "#742F8A", strokeWidth: 3 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Growth Statistics */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8"
          >
            <div className="text-center bg-white/10 rounded-xl p-4 md:p-6 border border-white/20">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {memberData[2].members - memberData[0].members > 0 ? '+' : ''}
                {memberData[2].members - memberData[0].members}
              </div>
              <div className="text-sm sm:text-base text-white/80">Total Growth</div>
            </div>
            <div className="text-center bg-white/10 rounded-xl p-4 md:p-6 border border-white/20">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {memberData[0].members > 0 ? 
                  Math.round(((memberData[2].members - memberData[0].members) / memberData[0].members) * 100) : 0}%
              </div>
              <div className="text-sm sm:text-base text-white/80">Growth Rate</div>
            </div>
            <div className="text-center bg-white/10 rounded-xl p-4 md:p-6 border border-white/20">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {memberData[2].members}
              </div>
              <div className="text-sm sm:text-base text-white/80">Current Members</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-center mt-8 md:mt-12 px-4"
        >
          <p className="text-white/90 text-sm sm:text-base md:text-lg mb-4 md:mb-6">
            Join our growing community and be part of this incredible journey!
          </p>
          <motion.a
            href="https://www.ieee.org/membership-catalog/productdetail/showProductDetailPage.html?product=MEMWIE050&searchResults=Y"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-gradient-to-r from-[#B08DB9] to-[#742F8A] text-white font-bold px-6 py-3 sm:px-8 sm:py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
          >
            Become a Member
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Growth;

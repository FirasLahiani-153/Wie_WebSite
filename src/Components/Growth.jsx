import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import SplitText from './SplitText';

const Growth = () => {
  const [memberData, setMemberData] = useState([
    { year: '2023', members: 141, label: '2023' },
    { year: '2024', members: 174, label: '2024' },
    { year: '2025', members: 210, label: '2025' }
  ]);

  const [isVisible, setIsVisible] = useState(false);

  // Animation for the chart
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

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
    return (
      <motion.circle
        cx={cx}
        cy={cy}
        r={6}
        fill="#B08DB9"
        stroke="#742F8A"
        strokeWidth={3}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        className="drop-shadow-lg"
      />
    );
  };

  return (
    <section id="growth" className="min-h-screen bg-gradient-to-br from-[#742F8A] via-[#8B4A9B] to-[#742F8A] relative py-20 overflow-hidden">
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
          className="text-center mb-16"
        >
          <SplitText
            text="Our Growth"
            className="text-7xl md:text-8xl font-bold text-white textShadow"
            delay={0.1}
            animationFrom={{ opacity: 0, y: 20 }}
            animationTo={{ opacity: 1, y: 0 }}
            ease="back.out(1.7)"
          />
          <p className="text-xl text-white/80 mt-4 max-w-2xl mx-auto">
            Witness the remarkable journey of WIE ISIMS as we grow together in empowering women in STEM
          </p>
        </motion.div>

        {/* Growth Chart Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl"
        >
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Member Growth Over the Years</h3>
            <p className="text-white/70">Our growing community of empowered women in STEM</p>
          </div>

          {/* Year Display Cards */}
          <div className="flex justify-center gap-4 mb-8">
            {memberData.map((data, index) => (
              <motion.div
                key={data.year}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/20 backdrop-blur-lg text-white px-6 py-3 rounded-full border border-white/30 font-medium"
              >
                {data.year}: {data.members} members
              </motion.div>
            ))}
          </div>

          {/* Chart */}
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={memberData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
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
                  fontSize={14}
                  fontWeight={500}
                />
                <YAxis 
                  stroke="white"
                  fontSize={14}
                  fontWeight={500}
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
          </div>

          {/* Growth Statistics */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
          >
            <div className="text-center bg-white/10 rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">
                {memberData[2].members - memberData[0].members > 0 ? '+' : ''}
                {memberData[2].members - memberData[0].members}
              </div>
              <div className="text-white/80">Total Growth</div>
            </div>
            <div className="text-center bg-white/10 rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">
                {memberData[0].members > 0 ? 
                  Math.round(((memberData[2].members - memberData[0].members) / memberData[0].members) * 100) : 0}%
              </div>
              <div className="text-white/80">Growth Rate</div>
            </div>
            <div className="text-center bg-white/10 rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">
                {memberData[2].members}
              </div>
              <div className="text-white/80">Current Members</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-center mt-12"
        >
          <p className="text-white/90 text-lg mb-6">
            Join our growing community and be part of this incredible journey!
          </p>
          <motion.a
            href="https://www.ieee.org/membership-catalog/productdetail/showProductDetailPage.html?product=MEMWIE050&searchResults=Y"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-gradient-to-r from-[#B08DB9] to-[#742F8A] text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Become a Member
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Growth;

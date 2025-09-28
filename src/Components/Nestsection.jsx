import React from 'react';
import Cards from "./Cards";
import SplitText from "./SplitText";
import { motion } from 'framer-motion';

const Nestsection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const rowVariants = {
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

  // Yearly teams data. Images reused as placeholders where needed.
  const teamsByYear = {
    2023: [
      { name: "Eya Maazoun", post: "Chair", path: "/assets/baya.png", social: { facebook: "https://facebook.com/baya", instagram: "https://instagram.com/baya", linkedin: "https://linkedin.com/in/baya" } },
      { name: "Ons Turki", post: "Vice Chair", path: "/assets/yosra.png", social: { facebook: "https://facebook.com/yosra", instagram: "https://instagram.com/yosra", linkedin: "https://linkedin.com/in/yosra" } },
      { name: "Nour Houda Zghal", post: "Secretary", path: "/assets/malek.png", social: { facebook: "https://facebook.com/malek", instagram: "https://instagram.com/malek", linkedin: "https://linkedin.com/in/malek" } },
      { name: "Ascil Chtioui", post: "Treasurer", path: "/assets/nour.png", social: { facebook: "https://facebook.com/nour", instagram: "https://instagram.com/nour", linkedin: "https://linkedin.com/in/nour" } }
    ],
    2024: [
      { name: "Emna Awadni", post: "Chair", path: "/assets/emna.png", social: { facebook: "https://www.facebook.com/emna.awadni", instagram: "https://www.instagram.com/emnaawadni", linkedin: "https://www.linkedin.com/in/emna-awadni-a50b692b1" } },
      { name: "Eya Bouaziz", post: "Vice Chair", path: "/assets/eya.png", social: { facebook: "https://www.instagram.com/eya.bouaziz1", instagram: "https://www.facebook.com/eya.bouaziz.73", linkedin: "hhttps://www.linkedin.com/in/eya-bouaziz-79481b16a" } },
      { name: "Wafa Zribi", post: "Secretary", path: "/assets/wafa.png", social: { facebook: "https://www.facebook.com/wafa.zribi.3", instagram: "https://www.instagram.com/wafa.zribi", linkedin: "https://www.linkedin.com/in/wafa-zribi" } },
      { name: "Nour Allouch", post: "Treasurer", path: "/assets/nour2.png", social: { facebook: "https://www.facebook.com/nour.allouch.33", instagram: "https://www.instagram.com/n.allouch", linkedin: "https://www.linkedin.com/in/nour-allouch-0014212b7" } },
      { name: "Amal Walha", post: "Web Master ", path: "/assets/amal.png", social: { facebook: "https://www.facebook.com/amalwalha08", instagram: "https://www.instagram.com/amal_walha", linkedin: "https://www.linkedin.com/in/amal-walha" } },
      
    ],
    2025: [
      { name: "Yosra Teieb", post: "Chair", path: "/assets/yosra.png", social: { facebook: "https://www.facebook.com/yosra.teieb.2025", instagram: "https://www.instagram.com/yosra._.teieb", linkedin: "https://www.linkedin.com/in/yosra-teieb" } },
      { name: "Baya Chaffai", post: "Vice Chair", path: "/assets/baya.png", social: { facebook: "https://www.facebook.com/baya.chaffai.7", instagram: "https://www.instagram.com/bayachaffai" } },
      { name: "Malek Charfeddine", post: "Secretary", path: "/assets/malek.png", social: { facebook: "https://www.facebook.com/malek.ch.739", instagram: "https://www.instagram.com/malek._.charfeddine", linkedin: "https://www.linkedin.com/in/malek-charfeddine-a026a9340" } },
      { name: "Nour Hadj Taieb", post: "Treasurer", path: "/assets/nour.png", social: { facebook: "https://www.facebook.com/nour.hadjtaieb.77", instagram: "https://www.instagram.com/nour_hadj_tayeb", linkedin: "https://www.linkedin.com/in/nourhadjtaieb2004" } },
      { name: "Elee Abidi", post: "Media Manager", path: "/assets/elee.png", social: { facebook: "https://www.facebook.com/elee.abidi.7", instagram: "https://www.instagram.com/elee__abidi", linkedin: "https://www.linkedin.com/in/elee-abidi-68ab8432a" } },
      { name: "Firas Lahiani", post: "Web Master", path: "/assets/firas.png", social: { facebook: "https://www.facebook.com/fitas.lahiani.9", instagram: "https://www.instagram.com/firaslahiani_00", linkedin: "https://www.linkedin.com/in/firaslahiani" } },
      { name: "Dr Ilhem Kallel", post: "Advisor", path: "/assets/ahlem.png", social: { facebook: "https://www.facebook.com/ikallel", instagram: "hhttps://www.instagram.com/ilhem_kallel", linkedin: "https://www.linkedin.com/in/ilhem-kallel-78699b36" } }
    ]
  };

  
  const [selectedYear, setSelectedYear] = React.useState(2025);

  return (
    <section id="team" className="w-screen min-h-screen bg-[#742F8A] relative py-20 overflow-hidden">
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent backdrop-blur-sm" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative">
        
        

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <SplitText
            text="Meet Our Team"
            className="text-7xl md:text-8xl font-bold text-white textShadow"
            delay={0.1}
            animationFrom={{ opacity: 0, y: 20 }}
            animationTo={{ opacity: 1, y: 0 }}
            ease="back.out(1.7)"
          />
          <p className="text-xl text-white/80 mt-4 max-w-2xl mx-auto">
            The passionate individuals driving innovation and empowerment in our WIE Affinity Group
          </p>
        </motion.div>

        {/* Year selector for Team */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          {[2025, 2024, 2023].map((year) => {
            const isActive = year === selectedYear;
            return (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={
                  `px-5 py-2 rounded-full border transition-colors duration-200 ` +
                  (isActive
                    ? `bg-white text-[#742F8A] border-white`
                    : `bg-transparent text-white border-white/50 hover:bg-white/10`)
                }
                aria-pressed={isActive}
              >
                {year}
              </button>
            );
          })}
        </motion.div>

        {/* Chair Section - Standalone */}
        <motion.div
          key={`chair-${selectedYear}`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="flex justify-center mb-12"
        >
          {teamsByYear[selectedYear]
            .filter(member => member.post === 'Chair')
            .map((member) => (
              <motion.div variants={rowVariants} key={`chair-${selectedYear}-${member.name}`}>
                {(selectedYear === 2023 ) ? (
                  // Custom card without image for 2023 and 2024
                  <div className="group max-w-[280px] rounded-2xl h-max overflow-hidden transition-all duration-300 hover:shadow-2xl bg-white/15 backdrop-blur-lg border border-white/15 hover:translate-y-[-10px]">
                    {/* Card Body */}
                    <div className="px-4 py-6 text-center relative bg-gradient-to-b from-white/15 to-white/8">
                      <h2 className="text-xl font-bold text-white mb-1 tracking-wide">
                        {member.name}
                      </h2>
                      <p className="text-white/90 font-medium tracking-wide mb-4 text-sm">{member.post}</p>
                    </div>

                    {/* Card Footer with Social Icons */}
                    <div className="flex justify-center gap-4 py-3 bg-white/8">
                      {[
                        { id: 'facebook', url: member.social.facebook, color: 'rgba(59, 89, 152, 0.9)', bg: 'rgba(59, 89, 152, 0.15)' },
                        { id: 'instagram', url: member.social.instagram, color: 'rgba(225, 48, 108, 0.9)', bg: 'rgba(225, 48, 108, 0.15)' },
                        { id: 'linkedin', url: member.social.linkedin, color: 'rgba(0, 119, 181, 0.9)', bg: 'rgba(0, 119, 181, 0.15)' }
                      ].map((platform, index) => (
                        <a 
                          key={platform.id}
                          href={platform.url || '#'} 
                          target={platform.url ? "_blank" : "_self"}
                          rel={platform.url ? "noopener noreferrer" : ""}
                          className={`transform transition-all duration-300 hover:scale-110 ${!platform.url ? 'opacity-50 cursor-default' : 'hover:opacity-80'}`}
                          onClick={!platform.url ? (e) => e.preventDefault() : undefined}
                        >
                          <div className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300"
                            style={{ background: platform.bg }}
                          >
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                              style={{ color: platform.color }}
                            >
                              {platform.id === 'facebook' ? (
                                <path
                                  fillRule="evenodd"
                                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                  clipRule="evenodd"
                                />
                              ) : platform.id === 'instagram' ? (
                                <path
                                  fillRule="evenodd"
                                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                  clipRule="evenodd"
                                />
                              ) : (
                                <path
                                  fillRule="evenodd"
                                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                                  clipRule="evenodd"
                                />
                              )}
                            </svg>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Regular Cards component for 2025
                  <Cards
                    name={member.name}
                    post={member.post}
                    path={member.path}
                    social={member.social}
                  />
                )}
              </motion.div>
            ))}
        </motion.div>

        {/* Other Team Members Grid */}
        <motion.div
          key={`team-${selectedYear}`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="flex flex-wrap justify-center gap-8"
        >
          {teamsByYear[selectedYear]
            .filter(member => member.post !== 'Chair')
            .sort((a, b) => {
              // Sort by post priority: Vice Chair, Secretary, Treasurer, etc.
              const postPriority = { 'Vice Chair': 1, 'Secretary': 2, 'Treasurer': 3, 'Media Manager': 4, 'Web Master': 5 };
              return (postPriority[a.post] || 99) - (postPriority[b.post] || 99);
            })
            .map((member) => (
            <motion.div variants={rowVariants} key={`team-${selectedYear}-${member.name}`}>
              {(selectedYear === 2023 ) ? (
                // Custom card without image for 2023 and 2024
                <div className="group max-w-[280px] rounded-2xl h-max overflow-hidden transition-all duration-300 hover:shadow-2xl bg-white/15 backdrop-blur-lg border border-white/15 hover:translate-y-[-10px]">
                  {/* Card Body */}
                  <div className="px-4 py-6 text-center relative bg-gradient-to-b from-white/15 to-white/8">
                    <h2 className="text-xl font-bold text-white mb-1 tracking-wide">
                      {member.name}
                    </h2>
                    <p className="text-white/90 font-medium tracking-wide mb-4 text-sm">{member.post}</p>
                  </div>

                  {/* Card Footer with Social Icons */}
                  <div className="flex justify-center gap-4 py-3 bg-white/8">
                    {[
                      { id: 'facebook', url: member.social.facebook, color: 'rgba(59, 89, 152, 0.9)', bg: 'rgba(59, 89, 152, 0.15)' },
                      { id: 'instagram', url: member.social.instagram, color: 'rgba(225, 48, 108, 0.9)', bg: 'rgba(225, 48, 108, 0.15)' },
                      { id: 'linkedin', url: member.social.linkedin, color: 'rgba(0, 119, 181, 0.9)', bg: 'rgba(0, 119, 181, 0.15)' }
                    ].map((platform, index) => (
                      <a 
                        key={platform.id}
                        href={platform.url || '#'} 
                        target={platform.url ? "_blank" : "_self"}
                        rel={platform.url ? "noopener noreferrer" : ""}
                        className={`transform transition-all duration-300 hover:scale-110 ${!platform.url ? 'opacity-50 cursor-default' : 'hover:opacity-80'}`}
                        onClick={!platform.url ? (e) => e.preventDefault() : undefined}
                      >
                        <div className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300"
                          style={{ background: platform.bg }}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            style={{ color: platform.color }}
                          >
                            {platform.id === 'facebook' ? (
                              <path
                                fillRule="evenodd"
                                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                clipRule="evenodd"
                              />
                            ) : platform.id === 'instagram' ? (
                              <path
                                fillRule="evenodd"
                                d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                clipRule="evenodd"
                              />
                            ) : (
                              <path
                                fillRule="evenodd"
                                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                                clipRule="evenodd"
                              />
                            )}
                          </svg>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                // Regular Cards component for 2025
                <Cards
                  name={member.name}
                  post={member.post}
                  path={member.path}
                  social={member.social}
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Nestsection;

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaLinkedin } from 'react-icons/fa';

const CAPTION_LIMIT = 120;

const SocialMedia = () => {
  const [facebookPosts, setFacebookPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedPosts, setExpandedPosts] = useState({});

  useEffect(() => {
    const fetchFacebookPosts = async () => {
      setIsLoading(true);
      try {
        const pageId = import.meta.env.VITE_FACEBOOK_PAGE_ID;
        const accessToken = import.meta.env.VITE_FACEBOOK_PAGE_ACCESS_TOKEN;
        const fields = 'id,message,created_time,attachments{media_type,media,url,subattachments}';
        const url = `https://graph.facebook.com/v18.0/${pageId}/posts?fields=${fields}&access_token=${accessToken}`;
        const res = await fetch(url);
        const data = await res.json();
        const posts = (data.data || []).map(post => ({
          id: post.id,
          image:
            post.attachments?.data?.[0]?.media?.image?.src ||
            post.attachments?.data?.[0]?.media?.source ||
            '/assets/facebook-default.jpg',
          caption: post.message || 'No caption available',
          date: new Date(post.created_time).toLocaleDateString(),
        }));
        setFacebookPosts(posts);
      } catch (error) {
        setFacebookPosts([]);
      }
      setIsLoading(false);
    };

    fetchFacebookPosts();
  }, []);

  const handleReadMore = (postId) => {
    setExpandedPosts(prev => ({ ...prev, [postId]: true }));
  };

  const socialLinks = [
    {
      platform: 'Facebook',
      icon: <FaFacebook className="text-3xl text-[#1877F2] hover:text-[#0B5FCC] transition-colors duration-300" />,
      url: import.meta.env.VITE_FACEBOOK_PROFILE_LINK,
      followers: '500+',
      posts: isLoading ? [] : facebookPosts.slice(0, 2),
    },
    {
      platform: 'LinkedIn',
      icon: <FaLinkedin className="text-3xl text-[#0077B5] hover:text-[#005582] transition-colors duration-300" />,
      url: 'https://www.linkedin.com/company/ieee-wie-isims-student-affinity-group',
      followers: '500+',
      posts: [
        {
          image: '/assets/coffeetalk.jpg',
          caption: "🌟 Join us for an inspiring Coffee Talk with our guest Ahlem Ammar Biotechnology PhD student and Founder & CEO of the biotech startup BIOMIDEX 🌟 📢 Discover her story in science, innovation, and entrepreneurship, and how she’s inspiring the next generation of women leaders in STEM. 🌟 ☕ Bring your coffee, your questions, and your curiosity .Let’s make it an empowering evening!📍 Google Meet ( Comment to send you the link) 🗓️ 13 August⏰ 8:00 PM BST",
          date: '1 Week ago'
        },
        {
          image: '/assets/linked.jpeg',
          caption: "✨A session full of energy, inspiration, and real stories! ✨ Chaima Kacem shared her journey as a student entrepreneur from the challenges she faced to the drive that kept her going. Thank you to everyone who joined us for this powerful moment at ISIMS. Here's to bold ideas and brave beginnings! ",
          date: '1 Month ago'
        }
      ]
    }
  ];

  return (
    <section id="social" className="min-h-screen bg-[#B08DB9] relative py-20 overflow-hidden">
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent backdrop-blur-sm" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Follow Us</h2>
          <p className="text-xl text-white/80">Stay connected with our latest updates and activities</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {socialLinks.map((platform, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{platform.icon}</span>
                  <h3 className="text-2xl font-bold text-white">{platform.platform}</h3>
                </div>
                <div className="text-white/80">
                  <p>{platform.followers} followers</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {platform.posts.map((post, postIndex) => {
                  // For Facebook posts, construct the post URL
                  let postUrl = undefined;
                  if (platform.platform === 'Facebook' && post.id) {
                    const pageId = import.meta.env.VITE_FACEBOOK_PAGE_ID;
                    postUrl = `https://www.facebook.com/${pageId}/posts/${post.id.split('_')[1] || post.id}`;
                  }
                  return (
                    <motion.div
                      key={post.id || postIndex}
                      whileHover={{ scale: 1.05 }}
                      className="bg-white/5 rounded-lg overflow-hidden"
                    >
                      {postUrl ? (
                        <a href={postUrl} target="_blank" rel="noopener noreferrer" className="block">
                          <div className="aspect-square bg-gray-800 relative">
                            <img
                              src={post.image}
                              alt={post.caption}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <p className="text-white/90 text-sm mb-2">
                              {post.caption.length > CAPTION_LIMIT && !expandedPosts[post.id || postIndex] ? (
                                <>
                                  {post.caption.slice(0, CAPTION_LIMIT)}...{' '}
                                  <button className="text-blue-300 underline" onClick={e => { e.preventDefault(); handleReadMore(post.id || postIndex); }}>
                                    Read more
                                  </button>
                                </>
                              ) : (
                                post.caption
                              )}
                            </p>
                            <p className="text-white/60 text-xs">{post.date}</p>
                          </div>
                        </a>
                      ) : (
                        <>
                          <div className="aspect-square bg-gray-800 relative">
                            <img
                              src={post.image}
                              alt={post.caption}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <p className="text-white/90 text-sm mb-2">
                              {post.caption.length > CAPTION_LIMIT && !expandedPosts[post.id || postIndex] ? (
                                <>
                                  {post.caption.slice(0, CAPTION_LIMIT)}...{' '}
                                  <button className="text-blue-300 underline" onClick={() => handleReadMore(post.id || postIndex)}>
                                    Read more
                                  </button>
                                </>
                              ) : (
                                post.caption
                              )}
                            </p>
                            <p className="text-white/60 text-xs">{post.date}</p>
                          </div>
                        </>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              <a
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-full transition-colors duration-300"
              >
                Follow on {platform.platform}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialMedia; 
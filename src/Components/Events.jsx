import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../supabaseClient';

const Events = ({ refreshTrigger = 0 }) => { // Add refreshTrigger prop
  const [showAll, setShowAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [events, setEvents] = useState([]);

  // Format date
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching events:', error.message);
      } else {
        // Ensure gallery is always an array
        const safeData = data.map(event => ({
          ...event,
          gallery: Array.isArray(event.gallery) ? event.gallery : []
        }));
        setEvents(safeData);
      }
    };

    fetchEvents();
  }, [refreshTrigger]); // Add refreshTrigger as dependency

  const visibleEvents = showAll ? events : events.slice(0, 3);

  // Escape close
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (lightboxIndex !== null) {
          setLightboxIndex(null);
        } else {
          setIsModalOpen(false);
          setSelectedEvent(null);
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxIndex]);

  // Scroll lock
  const scrollYRef = useRef(0);
  useEffect(() => {
    if (isModalOpen) {
      scrollYRef.current = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.width = '100%';
    } else {
      const y = scrollYRef.current;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, y);
    }
  }, [isModalOpen]);

  const showPrevImage = () => {
    if (!selectedEvent || !selectedEvent.gallery) return;
    setLightboxIndex((prev) =>
      prev === 0 ? selectedEvent.gallery.length - 1 : prev - 1
    );
  };
  const showNextImage = () => {
    if (!selectedEvent || !selectedEvent.gallery) return;
    setLightboxIndex((prev) =>
      prev === selectedEvent.gallery.length - 1 ? 0 : prev + 1
    );
  };

  const openModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setLightboxIndex(null);
  };

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  return (
    <section id="events" className="min-h-screen bg-[#742F8A] relative py-20 overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent backdrop-blur-sm" />

      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Events</h2>
          <p className="text-xl text-white/80">Join us in our events and check out our activities</p>
        </motion.div>

        {/* Events grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {visibleEvents.map((event, index) => (
            <motion.div
              key={event.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="bg-white/10 backdrop-blur-lg rounded-lg overflow-hidden"
            >
              <div className="aspect-video bg-gray-800 relative">
                <img src={event.cover} alt={event.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-white mb-1">{event.title}</h3>
                <div className="space-y-1.5 mb-3 text-sm">
                  <p className="text-white/80 flex items-center"><span className="mr-2">📅</span> {formatDate(event.date)}</p>
                  <p className="text-white/80 flex items-center"><span className="mr-2">⏰</span> {event.time}</p>
                  <p className="text-white/80 flex items-center"><span className="mr-2">📍</span> {event.place}</p>
                </div>
                <p className="text-white/90 text-sm mb-4 line-clamp-4">{event.descr}</p>
                <div className="flex justify-end">
                  <button onClick={() => openModal(event)} className="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-full transition-colors duration-300 text-sm">
                    More
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* See more button */}
        <div className="flex justify-center mt-10">
          <button onClick={() => setShowAll((prev) => !prev)} className="bg-white/20 hover:bg-white/30 text-white px-5 py-2 rounded-full transition-colors duration-300 text-sm">
            {showAll ? 'Show Less' : 'See More'}
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative z-10 w-[92%] md:w-[80%] lg:w-[60%] bg-white/10 backdrop-blur-xl rounded-xl shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 md:p-6 max-h-[85vh] overflow-y-auto">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-white">{selectedEvent.title}</h3>
                <button onClick={closeModal} className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full px-3 py-1">✕</button>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-white/90 flex items-center"><span className="mr-2">📅</span>{formatDate(selectedEvent.date)}</p>
                <p className="text-white/90 flex items-center"><span className="mr-2">⏰</span>{selectedEvent.time}</p>
                <p className="text-white/90 flex items-center"><span className="mr-2">📍</span>{selectedEvent.place}</p>
              </div>

              <p className="text-white/90 mb-6">{selectedEvent.descr}</p>

              {selectedEvent.gallery && selectedEvent.gallery.length > 0 && (
                <div>
                  <h4 className="text-white font-semibold mb-3">Gallery</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedEvent.gallery.map((src, i) => (
                      <div key={i} className="relative overflow-hidden rounded-lg bg-white/10">
                        <div onClick={() => openLightbox(i)} className="w-full cursor-zoom-in flex items-center justify-center">
                          <img src={src} alt={`gallery-${i}`} className="w-full h-auto max-h-72 hover:opacity-90 object-contain" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {isModalOpen && selectedEvent && lightboxIndex !== null && (
        <div className="fixed inset-0 z-[2100] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeLightbox} />
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2, ease: 'easeOut' }} className="relative z-[2101] max-w-[90vw] max-h-[85vh] flex flex-col items-center">
            <img src={selectedEvent.gallery[lightboxIndex]} alt="zoomed" className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg shadow-2xl" />
            <button onClick={showPrevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 text-2xl">&#8592;</button>
            <button onClick={showNextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 text-2xl">&#8594;</button>
            <button onClick={closeLightbox} className="absolute top-2 right-2 text-white/90 hover:text-white bg-black/40 hover:bg-black/60 rounded-full px-3 py-1">✕</button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white/80 text-sm bg-black/40 rounded px-3 py-1">
              {lightboxIndex + 1} / {selectedEvent.gallery.length}
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Events;
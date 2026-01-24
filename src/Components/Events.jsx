import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { supabase } from "../supabaseClient";

const Events = ({ refreshTrigger = 0 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  const eventsPerPage = 6;

  // Format date
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Check if event is upcoming based on date comparison
  const isEventUpcoming = (event) => {
    if (!event.date) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day

    const eventDate = new Date(event.date);
    eventDate.setHours(0, 0, 0, 0);

    // If event date is greater than today, it's upcoming
    if (eventDate > today) {
      return true;
    }

    // If event date is today, check if time hasn't passed
    if (eventDate.getTime() === today.getTime() && event.time) {
      const now = new Date();
      const [hours, minutes] = event.time.split(":");
      const eventDateTime = new Date(eventDate);
      eventDateTime.setHours(parseInt(hours), parseInt(minutes || 0), 0, 0);
      return eventDateTime > now;
    }

    // Otherwise it's a past event
    return false;
  };

  // Fetch events and categorize them
  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: false });

      if (error) {
        console.error("Error fetching events:", error.message);
      } else {
        // Ensure gallery is always an array
        const safeData = data.map((event) => ({
          ...event,
          gallery: Array.isArray(event.gallery) ? event.gallery : [],
        }));

        setEvents(safeData);

        // Separate upcoming and past events based on date
        const upcoming = [];
        const past = [];

        safeData.forEach((event) => {
          if (isEventUpcoming(event)) {
            upcoming.push(event);
          } else {
            past.push(event);
          }
        });

        // Sort upcoming events by date (ascending - soonest first)
        upcoming.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          if (dateA.getTime() === dateB.getTime() && a.time && b.time) {
            return a.time.localeCompare(b.time);
          }
          return dateA - dateB;
        });

        setUpcomingEvents(upcoming);
        setPastEvents(past);
        // Reset to first page when events change
        setCurrentPage(1);
      }
    };

    fetchEvents();

    // Check for date changes every minute to automatically update when events become past
    const interval = setInterval(fetchEvents, 60000);

    return () => clearInterval(interval);
  }, [refreshTrigger]);

  // Calculate pagination for past events
  const totalPages = Math.ceil(pastEvents.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;
  const visiblePastEvents = pastEvents.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      // Scroll to top of events section
      const eventsSection = document.getElementById("events");
      if (eventsSection) {
        eventsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      // Scroll to top of events section
      const eventsSection = document.getElementById("events");
      if (eventsSection) {
        eventsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  // Escape close
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        if (lightboxIndex !== null) {
          setLightboxIndex(null);
        } else {
          setIsModalOpen(false);
          setSelectedEvent(null);
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex]);

  // Scroll lock
  const scrollYRef = useRef(0);
  useEffect(() => {
    if (isModalOpen) {
      scrollYRef.current = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.width = "100%";
    } else {
      const y = scrollYRef.current;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
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
    <section
      id="events"
      className="min-h-screen bg-[#742F8A] relative py-20 overflow-hidden"
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent backdrop-blur-sm" />

      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Events</h2>
          <p className="text-xl text-white/80">
            Join us in our events and check out our activities
          </p>
        </motion.div>

        {/* Upcoming Events Section */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h3 className="text-3xl font-bold text-white mb-2">
              Upcoming Events
            </h3>
            <p className="text-lg text-white/80">
              Don't miss out on these exciting events!
            </p>
          </motion.div>

          {upcomingEvents.length > 0 ? (
            <>
              {upcomingEvents.length === 1 ? (
                // Center single upcoming event
                <div className="flex justify-center">
                  <div className="w-full max-w-md">
                    {upcomingEvents.map((event, index) => (
                      <motion.div
                        key={event.id || `upcoming-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.15 }}
                        className="bg-white/10 backdrop-blur-lg rounded-lg overflow-hidden border-2 border-yellow-400/50 shadow-lg"
                      >
                        <div className="aspect-video bg-gray-800 relative">
                          <div className="absolute top-2 right-2 bg-yellow-400 text-purple-900 px-2 py-1 rounded-full text-xs font-bold">
                            Upcoming
                          </div>
                          <img
                            src={event.cover}
                            alt={event.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="text-xl font-bold text-white mb-1">
                            {event.title}
                          </h3>
                          <div className="space-y-1.5 mb-3 text-sm">
                            <p className="text-white/80 flex items-center">
                              <span className="mr-2">📅</span>{" "}
                              {formatDate(event.date)}
                            </p>
                            <p className="text-white/80 flex items-center">
                              <span className="mr-2">⏰</span> {event.time}
                            </p>
                            <p className="text-white/80 flex items-center">
                              <span className="mr-2">📍</span> {event.place}
                            </p>
                          </div>
                          <p className="text-white/90 text-sm mb-4 line-clamp-4">
                            {event.descr}
                          </p>
                          <div className="flex justify-end">
                            <button
                              onClick={() => openModal(event)}
                              className="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-full transition-colors duration-300 text-sm"
                            >
                              More
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                // Grid layout for multiple upcoming events
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {upcomingEvents.map((event, index) => (
                    <motion.div
                      key={event.id || `upcoming-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.15 }}
                      className="bg-white/10 backdrop-blur-lg rounded-lg overflow-hidden border-2 border-yellow-400/50 shadow-lg"
                    >
                      <div className="aspect-video bg-gray-800 relative">
                        <div className="absolute top-2 right-2 bg-yellow-400 text-purple-900 px-2 py-1 rounded-full text-xs font-bold">
                          Upcoming
                        </div>
                        <img
                          src={event.cover}
                          alt={event.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-xl font-bold text-white mb-1">
                          {event.title}
                        </h3>
                        <div className="space-y-1.5 mb-3 text-sm">
                          <p className="text-white/80 flex items-center">
                            <span className="mr-2">📅</span>{" "}
                            {formatDate(event.date)}
                          </p>
                          <p className="text-white/80 flex items-center">
                            <span className="mr-2">⏰</span> {event.time}
                          </p>
                          <p className="text-white/80 flex items-center">
                            <span className="mr-2">📍</span> {event.place}
                          </p>
                        </div>
                        <p className="text-white/90 text-sm mb-4 line-clamp-4">
                          {event.descr}
                        </p>
                        <div className="flex justify-end">
                          <button
                            onClick={() => openModal(event)}
                            className="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-full transition-colors duration-300 text-sm"
                          >
                            More
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <div className="w-full max-w-md">
                <div className="bg-white/6 backdrop-blur-lg rounded-lg overflow-hidden border-2 border-yellow-400/40 shadow-lg p-6 text-center">
                  <div className="text-yellow-400 text-5xl mb-4">📣</div>
                  <h4 className="text-xl font-bold text-white mb-2">
                    Events are on the way
                  </h4>
                  <p className="text-white/80">
                    Stay tuned — we'll announce upcoming events soon!
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Past Events Section */}
        {pastEvents.length > 0 && (
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <h3 className="text-3xl font-bold text-white mb-2">
                Past Events
              </h3>
              <p className="text-lg text-white/80">
                Check out our previous activities
              </p>
            </motion.div>

            {/* Events grid */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {visiblePastEvents.map((event, index) => (
                <motion.div
                  key={event.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.15 }}
                  className="bg-white/10 backdrop-blur-lg rounded-lg overflow-hidden"
                >
                  <div className="aspect-video bg-gray-800 relative">
                    <img
                      src={event.cover}
                      alt={event.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {event.title}
                    </h3>
                    <div className="space-y-1.5 mb-3 text-sm">
                      <p className="text-white/80 flex items-center">
                        <span className="mr-2">📅</span>{" "}
                        {formatDate(event.date)}
                      </p>
                      <p className="text-white/80 flex items-center">
                        <span className="mr-2">⏰</span> {event.time}
                      </p>
                      <p className="text-white/80 flex items-center">
                        <span className="mr-2">📍</span> {event.place}
                      </p>
                    </div>
                    <p className="text-white/90 text-sm mb-4 line-clamp-4">
                      {event.descr}
                    </p>
                    <div className="flex justify-end">
                      <button
                        onClick={() => openModal(event)}
                        className="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-full transition-colors duration-300 text-sm"
                      >
                        More
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination Controls */}
            {pastEvents.length > eventsPerPage && (
              <div className="flex justify-center items-center gap-4 mt-10">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`bg-white/20 hover:bg-white/30 text-white px-5 py-2 rounded-full transition-colors duration-300 text-sm font-medium ${
                    currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  ← Previous
                </button>
                <span className="text-white/80 text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`bg-white/20 hover:bg-white/30 text-white px-5 py-2 rounded-full transition-colors duration-300 text-sm font-medium ${
                    currentPage === totalPages
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          />
          <div
            className="relative z-10 w-[92%] md:w-[80%] lg:w-[60%] bg-white/10 backdrop-blur-xl rounded-xl shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 md:p-6 max-h-[85vh] overflow-y-auto">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-white">
                  {selectedEvent.title}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full px-3 py-1"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-white/90 flex items-center">
                  <span className="mr-2">📅</span>
                  {formatDate(selectedEvent.date)}
                </p>
                <p className="text-white/90 flex items-center">
                  <span className="mr-2">⏰</span>
                  {selectedEvent.time}
                </p>
                <p className="text-white/90 flex items-center">
                  <span className="mr-2">📍</span>
                  {selectedEvent.place}
                </p>
              </div>

              <p className="text-white/90 mb-6">{selectedEvent.descr}</p>

              {selectedEvent.gallery && selectedEvent.gallery.length > 0 && (
                <div>
                  <h4 className="text-white font-semibold mb-3">Gallery</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedEvent.gallery.map((src, i) => (
                      <div
                        key={i}
                        className="relative overflow-hidden rounded-lg bg-white/10"
                      >
                        <div
                          onClick={() => openLightbox(i)}
                          className="w-full cursor-zoom-in flex items-center justify-center"
                        >
                          <img
                            src={src}
                            alt={`gallery-${i}`}
                            className="w-full h-auto max-h-72 hover:opacity-90 object-contain"
                            loading="lazy"
                            decoding="async"
                          />
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
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeLightbox}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative z-[2101] max-w-[90vw] max-h-[85vh] flex flex-col items-center"
          >
            <img
              src={selectedEvent.gallery[lightboxIndex]}
              alt="zoomed"
              className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg shadow-2xl"
              loading="lazy"
              decoding="async"
            />
            <button
              onClick={showPrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 text-2xl"
            >
              &#8592;
            </button>
            <button
              onClick={showNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 text-2xl"
            >
              &#8594;
            </button>
            <button
              onClick={closeLightbox}
              className="absolute top-2 right-2 text-white/90 hover:text-white bg-black/40 hover:bg-black/60 rounded-full px-3 py-1"
            >
              ✕
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white/80 text-sm bg-black/40 rounded px-3 py-1">
              {lightboxIndex + 1} / {selectedEvent.gallery.length}
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default React.memo(Events);

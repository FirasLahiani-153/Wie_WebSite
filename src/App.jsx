import { useState, useEffect } from "react";
import "./App.css";
import "./index.css";
import Hero from "./Components/Hero";
import Navbar from "./Components/Navbar";
import Wave from "./Components/Wave";
import SmoothWrapper from "./Components/smoothwrapper";
import Nestsection from "./Components/Nestsection";
import SectionAct from "./Components/SectionAct";
import About from "./Components/About";
import Events from "./Components/Events";
import Growth from "./Components/Growth";
import SocialMedia from "./Components/SocialMedia";
import Footer from "./Components/Footer";
import SplashScreen from "./Components/SplashScreen";
import TopBar from "./Components/TopBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EventForm from "./Components/EventForm";
import Auth from "./Components/Auth";
import { supabase } from './supabaseClient';
import DebugRender from "./Components/DebugRender";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [authInitialized, setAuthInitialized] = useState(false);
  const [refreshEvents, setRefreshEvents] = useState(0);
  const [newEvent, setNewEvent] = useState(null);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleEventAdded = (eventData) => {
    console.log('Event added callback received:', eventData);
    setNewEvent(eventData);
    setRefreshEvents(prev => prev + 1);
    
    // Clear newEvent after a short delay to prevent duplicate additions
    setTimeout(() => {
      setNewEvent(null);
    }, 1000);
  };

  // Initialize auth state and listen for changes
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Get initial session
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
        
        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (event, session) => {
            console.log('Auth state changed:', event, session?.user?.email || 'no user');
            setUser(session?.user ?? null);
          }
        );

        setAuthInitialized(true);
        
        // Cleanup subscription on unmount
        return () => subscription.unsubscribe();
      } catch (error) {
        console.error('Auth initialization error:', error);
        setAuthInitialized(true); // Still set to true to show auth form
      }
    };

    initializeAuth();
  }, []);

  // Admin Page Component
  const AdminPage = () => (
    <>
      <DebugRender componentName="AdminPage" user={user} />
      <TopBar />
      <div className="h-10" />
      <Navbar />
      <div className="min-h-screen bg-[#742F8A] py-8">
        <div className="container mx-auto px-4">
          <Auth user={user} authInitialized={authInitialized} />
          {user ? (
            <EventForm onEventAdded={handleEventAdded} />
          ) : (
            <div className="text-center py-8">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Admin Access Required</h2>
                <p className="text-white/80">Please sign in to access the event management system.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );

  return (
    <>
      <SplashScreen onLoadingComplete={handleLoadingComplete} />
      {!isLoading && (
        <Router>
          <Routes>
            {/* Main page */}
            <Route 
              path="/" 
              element={
                <SmoothWrapper>
                  <main className="overflow-hidden bg-primary custom-cursor">
                    <TopBar />
                    <div className="h-10" />
                    <Navbar />
                    <Hero />
                    <Wave />
                    <About />
                    <Growth />
                    <Nestsection />
                    <SectionAct />
                    <Events refreshTrigger={refreshEvents} newEvent={newEvent} />
                    <SocialMedia />
                    <Footer />
                  </main>
                </SmoothWrapper>
              } 
            />
            
            {/* Admin page - NO SmoothWrapper */}
            <Route 
              path="/admin" 
              element={
                <main className="overflow-hidden bg-primary custom-cursor">
                  <AdminPage />
                </main>
              }
            />
          </Routes>
        </Router>
      )}
      
      {/* Script outside of router */}
      <script
        async
        data-id="7233587839"
        id="chtl-script"
        type="text/javascript"
        src="https://chatling.ai/js/embed.js"
      ></script>
    </>
  );
}

export default App;
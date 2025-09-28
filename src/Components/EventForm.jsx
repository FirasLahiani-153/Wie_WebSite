import React, { useState, useCallback } from 'react';
import { supabase } from '../supabaseClient';

const EventForm = ({ onEventAdded }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    descr: '',
    date: '',
    time: '',
    place: '',
  });
  const [coverFile, setCoverFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [coverPreview, setCoverPreview] = useState(null);
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  // Memoize event handlers to prevent re-creation on every render
  const handleInputChange = useCallback((e) => {
    e.stopPropagation();
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleCoverChange = useCallback((e) => {
    e.stopPropagation();
    const file = e.target.files[0];
    if (file) {
      setCoverFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleGalleryChange = useCallback((e) => {
    e.stopPropagation();
    const files = Array.from(e.target.files);
    setGalleryFiles(files);
    
    // Create previews
    const previews = [];
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previews.push(reader.result);
        if (previews.length === files.length) {
          setGalleryPreviews(previews);
        }
      };
      reader.readAsDataURL(file);
    });
  }, []);

  // Upload single image to Supabase storage
  const uploadImage = async (file, folder = '') => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = folder ? `${folder}/${fileName}` : fileName;

      const { data, error } = await supabase.storage
        .from('event-images')
        .upload(filePath, file);

      if (error) {
        console.error('Upload error:', error);
        throw error;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('event-images')
        .getPublicUrl(filePath);

      return urlData.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check if user is authenticated
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError) {
        throw new Error('Authentication error: ' + authError.message);
      }
      
      if (!user) {
        throw new Error('You must be logged in to create events');
      }

      let coverUrl = null;
      let galleryUrls = [];

      // Upload cover image
      if (coverFile) {
        coverUrl = await uploadImage(coverFile, 'covers');
      }

      // Upload gallery images
      if (galleryFiles.length > 0) {
        const uploadPromises = galleryFiles.map(file => 
          uploadImage(file, 'gallery')
        );
        galleryUrls = await Promise.all(uploadPromises);
      }

      // Insert event into database
      const eventData = {
        ...formData,
        cover: coverUrl,
        gallery: galleryUrls,
        user_id: user.id
      };

      const { data, error } = await supabase
        .from('events')
        .insert([eventData])
        .select();

      if (error) {
        console.error('Database error:', error);
        throw error;
      }

      // Reset form
      setFormData({
        title: '',
        descr: '',
        date: '',
        time: '',
        place: '',
      });
      setCoverFile(null);
      setGalleryFiles([]);
      setCoverPreview(null);
      setGalleryPreviews([]);

      // Notify parent component
      if (onEventAdded) {
        onEventAdded(data[0]);
      }

      alert('Event created successfully!');

    } catch (error) {
      console.error('Error creating event:', error);
      alert('Error creating event: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-8" style={{ transform: 'none', willChange: 'auto' }}>
      <h2 className="text-2xl font-bold text-white mb-6">Create New Event</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6" style={{ transform: 'none' }}>
        {/* Title */}
        <div>
          <label className="block text-white font-medium mb-2">Event Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:border-white/50 focus:outline-none"
            placeholder="Enter event title"
            style={{ transform: 'none', willChange: 'auto' }}
          />
        </div>

        {/* descrription */}
        <div>
          <label className="block text-white font-medium mb-2">descrription</label>
          <textarea
            name="descr"
            value={formData.descr}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:border-white/50 focus:outline-none"
            placeholder="Enter event descrription"
          />
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white font-medium mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:border-white/50 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-white font-medium mb-2">Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:border-white/50 focus:outline-none"
            />
          </div>
        </div>

        {/* Place */}
        <div>
          <label className="block text-white font-medium mb-2">Location</label>
          <input
            type="text"
            name="place"
            value={formData.place}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:border-white/50 focus:outline-none"
            placeholder="Enter event location"
          />
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-white font-medium mb-2">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverChange}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:border-white/50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-white/30 file:text-white"
          />
          {coverPreview && (
            <div className="mt-2">
              <img src={coverPreview} alt="Cover preview" className="w-32 h-32 object-cover rounded-lg" />
            </div>
          )}
        </div>

        {/* Gallery Images */}
        <div>
          <label className="block text-white font-medium mb-2">Gallery Images (Optional)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleGalleryChange}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:border-white/50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-white/30 file:text-white"
          />
          {galleryPreviews.length > 0 && (
            <div className="mt-2 grid grid-cols-4 gap-2">
              {galleryPreviews.map((preview, index) => (
                <img key={index} src={preview} alt={`Gallery preview ${index}`} className="w-20 h-20 object-cover rounded-lg" />
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-6 bg-white/20 hover:bg-white/30 disabled:bg-white/10 text-white font-medium rounded-lg transition-colors duration-300 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating Event...' : 'Create Event'}
        </button>
      </form>
    </div>
  );
};

export default EventForm;
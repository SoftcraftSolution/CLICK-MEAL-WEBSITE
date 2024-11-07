import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Banner.css';

const Banner = () => {
  const [bannerImage, setBannerImage] = useState('');

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await axios.get('https://clickmeal-backend.vercel.app/user/get-banner');
        if (response.data && response.data.banners && response.data.banners.length > 0) {
          // Select the first banner's image
          setBannerImage(response.data.banners[0].image);
        } else {
          console.error('No banners found in response');
        }
      } catch (error) {
        console.error('Error fetching the banner image:', error);
      }
    };

    fetchBanner();
  }, []);

  return (
    <section 
      className="banner-container" 
      style={{ backgroundImage: bannerImage ? `url(${bannerImage})` : 'none' }}
    >
      
    </section>
  );
};

export default Banner;

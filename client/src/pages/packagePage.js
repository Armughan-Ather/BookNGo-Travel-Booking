import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PackageCardComponent from '../components/PackageCardComponent';
import '../styles/packagesPage.css';

export default function PackagesPage() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    // Fetch package data from the backend on initial render
    const fetchPackages = async () => {
      try {
        const response = await axios.get('/api/packages');  // Adjust endpoint as needed
        setPackages(response.data.data);
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };

    fetchPackages();
  }, []);

  return (
    <div className="bookngo-packages-page-container">
      <h1 className="bookngo-packages-title">Available Packages</h1>
      <div className="bookngo-packages-card-container">
        {packages.map((pkg, index) => (
          <PackageCardComponent key={index} packageData={pkg} />
        ))}
      </div>
    </div>
  );
}

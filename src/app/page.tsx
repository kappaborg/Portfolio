'use client';

import AnimatedLogo from '@/components/AnimatedLogo';
import { ArrowPathIcon, MapIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { motion } from 'framer-motion';
import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';




// Dinamik olarak harita bileşenini yüklüyoruz (SSR sorunlarını önlemek için)
const MapComponent = dynamic(() => import('../components/Map'), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 animate-pulse rounded-lg" />
  ),
});

interface LocationData {
  ip: string;
  city: string;
  country: string;
  lat: number;
  lon: number;
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Home() {
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchLocationData = async () => {
    try {
      setRefreshing(true);
      const ipResponse = await axios.get('https://api.ipify.org?format=json');
      const ip = ipResponse.data.ip;

      const locationResponse = await axios.get(`https://ipapi.co/${ip}/json/`);
      const data = locationResponse.data;

      setLocationData({
        ip: ip,
        city: data.city,
        country: data.country_name,
        lat: data.latitude,
        lon: data.longitude
      });
      setError(null);
    } catch (err) {
      setError('Konum bilgisi alınamadı');
      console.error('Error:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLocationData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            <AnimatedLogo />
            <div className="space-y-4">
              <div className="h-8 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-gray-700 dark:to-gray-600 rounded-full w-1/3 mx-auto animate-pulse" />
              <div className="h-32 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-gray-700 dark:to-gray-600 rounded-lg animate-pulse" />
              <div className="h-[500px] bg-gradient-to-r from-blue-100 to-blue-200 dark:from-gray-700 dark:to-gray-600 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950 dark:to-pink-950 flex items-center justify-center px-4"
      >
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900">
              <MapIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="mt-4 text-red-600 dark:text-red-400 text-xl font-semibold">Hata Oluştu</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">{error}</p>
            <button
              onClick={fetchLocationData}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
            >
              Tekrar Dene
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div variants={itemVariants} className="text-center mb-12">
          <AnimatedLogo />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            GodEye
          </h1>
          <p className="text-gray-600 dark:text-gray-300">IP adresinizin coğrafi konumunu keşfedin</p>
        </motion.div>

        {locationData && (
          <div className="space-y-8">
            <motion.div
              variants={itemVariants}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg rounded-xl p-6 border border-blue-100 dark:border-blue-900"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Konum Bilgileriniz
                </h2>
                <button
                  onClick={fetchLocationData}
                  disabled={refreshing}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowPathIcon className={`h-4 w-4 mr-1.5 ${refreshing ? 'animate-spin' : ''}`} />
                  Yenile
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  variants={itemVariants}
                  className="space-y-4"
                >
                  <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-medium">IP Adresi:</span>{' '}
                      <span className="font-mono">{locationData.ip}</span>
                    </p>
                  </div>
                  <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-medium">Şehir:</span> {locationData.city}
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  variants={itemVariants}
                  className="space-y-4"
                >
                  <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-medium">Ülke:</span> {locationData.country}
                    </p>
                  </div>
                  <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-medium">Koordinatlar:</span>{' '}
                      <span className="font-mono">
                        {locationData.lat.toFixed(6)}, {locationData.lon.toFixed(6)}
                      </span>
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg rounded-xl p-2 border border-blue-100 dark:border-blue-900 overflow-hidden"
            >
              <div className="h-[500px]">
                <MapComponent
                  center={[locationData.lat, locationData.lon]}
                  location={locationData}
                />
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </motion.main>
  );
}

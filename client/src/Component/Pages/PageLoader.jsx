import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from './Loader';

const PageLoader = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true); // true initially for page load

  useEffect(() => {
    // simulate soft loading delay
    const timer = setTimeout(() => setLoading(false), 500); // 0.5s soft load
    return () => clearTimeout(timer);
  }, []); // initial page load

  useEffect(() => {
    // show loader on route change
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300); // small delay
    return () => clearTimeout(timer);
  }, [location]);

  return loading ? <Loader /> : null;
};

export default PageLoader;

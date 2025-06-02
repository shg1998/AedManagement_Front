import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// ==============================|| NAVIGATION SCROLL TO TOP ||============================== //

const NavigationScroll = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  useEffect(() => {
    // add overflowY: 'auto' to the body element
    document.body.style.overflowY = 'auto';
    return () => {
      document.body.style.overflowY = 'unset';
    };
  }, []);

  return children || null;
};

NavigationScroll.propTypes = {
  children: PropTypes.node
};

export default NavigationScroll;
import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './StandardHeroSection.module.css';

export const StandardHeroSection = ({ 
  videoSrc,
  videoPoster,
  title,
  subtitle,
  actions,
  className = '',
  autoPlay = true,
  muted = true,
  loop = true,
  ...props 
}) => {
  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video && autoPlay) {
      video.play().catch(err => {
        console.log('Video autoplay failed:', err);
      });
    }
  }, [autoPlay, isVideoLoaded]);

  return (
    <section 
      className={`${styles.heroSection} ${className}`}
      {...props}
    >
      <div className={styles.videoContainer}>
        <video
          ref={videoRef}
          className={styles.video}
          poster={videoPoster}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className={styles.overlay} />
      </div>
      
      <div className={styles.content}>
        {title && <h1 className={styles.title}>{title}</h1>}
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    </section>
  );
};

StandardHeroSection.propTypes = {
  videoSrc: PropTypes.string.isRequired,
  videoPoster: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  actions: PropTypes.node,
  className: PropTypes.string,
  autoPlay: PropTypes.bool,
  muted: PropTypes.bool,
  loop: PropTypes.bool
};

export default StandardHeroSection;
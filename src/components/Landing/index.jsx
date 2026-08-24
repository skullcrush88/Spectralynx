'use client'
import styles from './style.module.scss'
import { slideUp } from './animation';
import { motion } from 'framer-motion';
import Rounded from '../../common/RoundedButton';
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)');
    setIsMobile(media.matches);
    const listener = (e) => setIsMobile(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  const videos = [
    "/Herobgvid.mp4",
    "/CCTV-vid2.mp4",
    isMobile ? "/Herobgvid2mobile.mp4" : "/Herobgvid2.mp4"
  ];
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const videoRef3 = useRef(null);
  const videoRefs = [videoRef1, videoRef2, videoRef3];

  const prevVideoIndexRef = useRef(currentVideoIndex);

  useEffect(() => {
    // Play the active video
    const activeVideo = videoRefs[currentVideoIndex].current;
    if (activeVideo) {
      activeVideo.currentTime = 0;
      activeVideo.play().catch(() => {});
    }

    // Pause other inactive videos immediately except the active one and the previously active one
    const prevIndex = prevVideoIndexRef.current;
    videoRefs.forEach((ref, idx) => {
      if (idx !== currentVideoIndex && idx !== prevIndex) {
        if (ref.current) ref.current.pause();
      }
    });

    // Delay pausing the previously active video to let the transition complete smoothly
    if (prevIndex !== currentVideoIndex) {
      const prevVideo = videoRefs[prevIndex].current;
      const timer = setTimeout(() => {
        if (prevVideo) prevVideo.pause();
      }, 1200);
      
      prevVideoIndexRef.current = currentVideoIndex;
      return () => clearTimeout(timer);
    }
  }, [currentVideoIndex]);

  return (
    <motion.main variants={slideUp} initial="initial" animate="enter" className={styles.landing}>
      {videos.map((src, idx) => (
        <video 
          key={src}
          ref={videoRefs[idx]}
          src={src}
          muted
          playsInline
          onEnded={() => {
            if (idx === currentVideoIndex) {
              setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
            }
          }}
          style={{
            opacity: idx === currentVideoIndex ? 1 : 0,
            transition: 'opacity 1.2s ease-in-out',
          }}
        />
      ))}
      
      <div className={styles.content}>
        <h1 className={styles.title}>
          Intelligent Solutions.<br />
          Seamless Systems.
        </h1>
        <p className={styles.subtitle}>
          SpectraLynx Technologies delivers turnkey systems and integration services that empower businesses to operate smarter, safer, and faster.
        </p>
        <a href="#solutions" className={styles.ctaWrapper}>
          <Rounded>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative', zIndex: 1 }}>
              <p style={{ margin: 0, fontSize: '16px', fontWeight: '500' }}>Explore Solutions</p>
              <svg className={styles.ctaArrow} width="12" height="12" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="white" fillRule="evenodd" clipRule="evenodd"/>
              </svg>
            </div>
          </Rounded>
        </a>
      </div>

    </motion.main>
  )
}

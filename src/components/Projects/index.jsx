'use client';
import styles from './style.module.scss'
import { useState, useEffect, useRef } from 'react';
import Project from './components/project';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';
import Rounded from '../../common/RoundedButton';

const projects = [
  {
    title: "Voice Solutions",
    subtitle: "Telecom, VoIP, & IPPBX Integrations",
    src: "voice.png",
    color: "#1E293B",
    description: "Deploy next-generation communication systems tailored for modern enterprise needs. We provide robust voice solutions that unify your team and keep you connected with clients globally.",
    features: [
      "IPPBX (Intercom) / Unified Communication",
      "Call Centre Solutions (IVR, CRM, Logger)",
      "GSM Gateways & SIP Trunking",
      "Professional Communication Headsets",
      "Structured Passive Cabling & Configuration"
    ]
  },
  {
    title: "Data Networks",
    subtitle: "Switches, Routers, Firewalls & APs",
    src: "data.png",
    color: "#334155",
    description: "Construct a secure, scalable, and high-performance network infrastructure. Our networking solutions ensure seamless connectivity, zero downtime, and robust cybersecurity defenses.",
    features: [
      "Enterprise Switches & Core Routers",
      "Next-Gen Firewalls & Network Security",
      "Wireless Controllers & Access Points",
      "SD-WAN, MPLS & P2P Connectivity",
      "Structured Fiber & Copper Cabling"
    ]
  },
  {
    title: "Audio Visual SI",
    subtitle: "Boardrooms, Video Walls & Display Systems",
    src: "board-room.jpg",
    color: "#0F172A",
    description: "Transform your meeting rooms and spaces into state-of-the-art interactive environments. We integrate high-definition audio and video systems for immersive collaboration.",
    features: [
      "Video Conferencing Systems",
      "Boardroom & Auditorium SI",
      "LED Video Walls & Digital Signage",
      "Interactive Classroom Projectors",
      "Professional Displays & Control Panels"
    ]
  },
  {
    title: "Surveillance & Safety",
    subtitle: "CCTV, Access Control & Fire Alarms",
    src: "security.png",
    color: "#131A26",
    description: "Protect your assets, staff, and facilities with advanced surveillance and automated safety systems. We deliver integrated solutions that provide real-time monitoring and security alerts.",
    features: [
      "High-Definition CCTV Surveillance",
      "Biometric Access Control Systems",
      "Integrated Fire Detection & Alarm Systems",
      "Public Addressing (PA) Systems",
      "Fiber Backhaul & Central Monitoring Station"
    ]
  },
  {
    title: "Digital & Marketing",
    subtitle: "Branding, Printing & Digital Campaigns",
    src: "marketing.png",
    color: "#475569",
    description: "Accelerate your brand presence and market reach. From premium corporate branding and high-quality printing services to performance-driven digital marketing campaigns, we cover all your creative needs.",
    features: [
      "Corporate Identity & Logo Design",
      "Outdoor & Indoor Advertising Materials",
      "Premium Offsets & Digital Printing",
      "Corporate Gifting & Merchandising",
      "SEO, SEM & Social Media Strategy"
    ]
  },
  {
    title: "Equipment Rentals",
    subtitle: "Short/Long Term Infrastructure Leasing",
    src: "rental.png",
    color: "#1E293B",
    description: "Access top-tier technology infrastructure without heavy capital expenditure. We offer flexible, SLA-backed leasing options for servers, networks, call center software, and end-user hardware.",
    features: [
      "Call Center Software & Dialers",
      "Core Routers, Switches & Firewall Leasing",
      "Enterprise Rack Servers & Storage",
      "Business Laptops, PCs & Tablets",
      "Comprehensive Maintenance & Support AMC"
    ]
  }
]

const scaleAnimation = {
    initial: {scale: 0, x:"-50%", y:"-50%"},
    enter: {scale: 1, x:"-50%", y:"-50%", transition: {duration: 0.4, ease: [0.76, 0, 0.24, 1]}},
    closed: {scale: 0, x:"-50%", y:"-50%", transition: {duration: 0.4, ease: [0.32, 0, 0.67, 0]}}
}

const modalAnimation = {
    initial: {scale: 0, x:"15%", y:"-50%"},
    enter: {scale: 1, x:"15%", y:"-50%", transition: {duration: 0.4, ease: [0.76, 0, 0.24, 1]}},
    closed: {scale: 0, x:"15%", y:"-50%", transition: {duration: 0.4, ease: [0.32, 0, 0.67, 0]}}
}

export default function Home() {

  const [modal, setModal] = useState({active: false, index: 0})
  const [selectedProject, setSelectedProject] = useState(null)
  const { active, index } = modal;
  const modalContainer = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);

  let xMoveContainer = useRef(null);
  let yMoveContainer = useRef(null);
  let xMoveCursor = useRef(null);
  let yMoveCursor = useRef(null);
  let xMoveCursorLabel = useRef(null);
  let yMoveCursorLabel = useRef(null);

  useEffect( () => {
    //Move Container
    xMoveContainer.current = gsap.quickTo(modalContainer.current, "left", {duration: 0.8, ease: "power3"})
    yMoveContainer.current = gsap.quickTo(modalContainer.current, "top", {duration: 0.8, ease: "power3"})
    //Move cursor
    xMoveCursor.current = gsap.quickTo(cursor.current, "left", {duration: 0.5, ease: "power3"})
    yMoveCursor.current = gsap.quickTo(cursor.current, "top", {duration: 0.5, ease: "power3"})
    //Move cursor label
    xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "left", {duration: 0.45, ease: "power3"})
    yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "top", {duration: 0.45, ease: "power3"})
  }, [])

  const moveItems = (x, y) => {
    xMoveContainer.current(x)
    yMoveContainer.current(y)
    xMoveCursor.current(x)
    yMoveCursor.current(y)
    xMoveCursorLabel.current(x)
    yMoveCursorLabel.current(y)
  }
  const manageModal = (active, index, x, y) => {
    moveItems(x, y)
    setModal({active, index})
  }

  return (
  <main onMouseMove={(e) => {moveItems(e.clientX, e.clientY)}} id="solutions" className={styles.projects}>
    <div className={styles.body}>
      {
        projects.map( (project, index) => {
          return <Project index={index} title={project.title} subtitle={project.subtitle} manageModal={manageModal} onClick={() => setSelectedProject(index)} key={index}/>
        })
      }
    </div>
    <Rounded>
      <p>Get a Quote</p>
    </Rounded>
    <>
        <motion.div ref={modalContainer} variants={modalAnimation} initial="initial" animate={active ? "enter" : "closed"} className={styles.modalContainer}>
            <div style={{top: index * -100 + "%"}} className={styles.modalSlider}>
            {
                projects.map( (project, index) => {
                const { src, color } = project
                return <div className={styles.modal} style={{backgroundColor: color}} key={`modal_${index}`}>
                    <Image 
                    src={`/images/${src}`}
                    width={300}
                    height={0}
                    alt="image"
                    />
                </div>
                })
            }
            </div>
        </motion.div>
        <motion.div ref={cursor} className={styles.cursor} variants={scaleAnimation} initial="initial" animate={active ? "enter" : "closed"}></motion.div>
        <motion.div ref={cursorLabel} className={styles.cursorLabel} variants={scaleAnimation} initial="initial" animate={active ? "enter" : "closed"}>View</motion.div>
    </>

    {/* Detail Modal Dialog */}
    <AnimatePresence>
      {selectedProject !== null && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.overlay}
          onClick={() => setSelectedProject(null)}
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeBtn} onClick={() => setSelectedProject(null)} aria-label="Close modal">
              ✕
            </button>
            
            <div className={styles.modalImageContainer}>
              <Image 
                src={`/images/${projects[selectedProject].src}`}
                alt={projects[selectedProject].title}
                fill={true}
                className={styles.modalImage}
              />
            </div>
            
            <div className={styles.modalDetails}>
              <span className={styles.modalCategory}>SERVICE EXCELLENCE</span>
              <h2>{projects[selectedProject].title}</h2>
              <p className={styles.modalSub}>{projects[selectedProject].subtitle}</p>
              <p className={styles.modalDesc}>{projects[selectedProject].description}</p>
              
              <div className={styles.featuresList}>
                <h3>Key Deliverables</h3>
                <ul>
                  {projects[selectedProject].features.map((feat, idx) => (
                    <li key={idx}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
              
              <a href="#footer" className={styles.modalCta} onClick={() => setSelectedProject(null)}>
                Get Started with this Service
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="white" fillRule="evenodd" clipRule="evenodd"/>
                </svg>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </main>
  )
}

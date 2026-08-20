import styles from './style.module.scss';
import { useInView, motion } from 'framer-motion';
import { useRef } from 'react';
import { slideUp, opacity } from './animation';
import Rounded from '../../common/RoundedButton';
export default function index() {

    const phrase = "Designing, deploying, and managing complex systems infrastructure. We empower enterprises with robust turnkey communication, networking, and safety systems.";
    const description = useRef(null);
    const isInView = useInView(description)
    return (
        <div ref={description} id="about" className={styles.description}>
            <div className={styles.body}>
                <p>
                {
                    phrase.split(" ").map( (word, index) => {
                        return <span key={index} className={styles.mask}><motion.span variants={slideUp} custom={index} animate={isInView ? "open" : "closed"} key={index}>{word}</motion.span></span>
                    })
                }
                </p>
                <motion.p variants={opacity} animate={isInView ? "open" : "closed"}>Based in Hyderabad, SpectraLynx Technologies is a premier System Integration House. We handle comprehensive cabling and passive component implementations tailored to your scale.</motion.p>
                <div data-scroll data-scroll-speed={0.1}>
                    <Rounded className={styles.button}>
                        <p>About Us</p>
                    </Rounded>
                </div>
            </div>
        </div>
    )
}

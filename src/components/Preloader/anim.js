export const opacity = {
  initial: {
    opacity: 0
  },
  enter: {
    opacity: 0.75,
    transition: { duration: 0.2, delay: 0.1 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

export const slideUp = {
  initial: {
    top: 0
  },
  exit: {
    top: "-100vh",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
  }
};

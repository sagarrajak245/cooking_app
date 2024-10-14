import React, { useEffect, useRef, useState } from 'react';
import './test.css';

const TransformingShape = () => {
  const [isVisible, setIsVisible] = useState(false);
  const shapeRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); 
        }
      },
      { threshold: 0.1 } 
    );

    if (shapeRef.current) {
      observer.observe(shapeRef.current);
    }

    return () => {
      if (shapeRef.current) {
        observer.unobserve(shapeRef.current);
      }
    };
  }, []);

  return (
    <div className="container">
      <div
        ref={shapeRef}
        className={`animated-shape ${isVisible ? 'animate' : ''}`}
      ></div>
    </div>
  );
};

export default TransformingShape;

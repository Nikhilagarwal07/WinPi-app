// File: frontend/src/components/AnimatedShapes.jsx

import React from "react";

const AnimatedShapes = () => (
    <div className="shapes-background">
      <div className="shape square s1" style={{width: 80, height: 80}}></div>
      <div className="shape circle s2" style={{width: 20, height: 20}}></div>
      <div className="shape triangle s3" style={{width: 0, height: 0}}></div>
      <div className="shape cross s4" style={{width: 60, height: 60}}></div>
      <div className="shape circle s5" style={{width: 20, height: 20}}></div>
      <div className="shape square s6" style={{width: 110, height: 110}}></div>
      <div className="shape triangle s7" style={{width: 0, height: 0, borderLeftWidth: 75, borderRightWidth: 75, borderBottomWidth: 150}}></div>
      <div className="shape cross s8" style={{width: 25, height: 25}}></div>
    </div>
);

export default AnimatedShapes;
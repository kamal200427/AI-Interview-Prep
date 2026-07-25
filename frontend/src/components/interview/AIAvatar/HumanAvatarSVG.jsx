import React from "react";
import { motion } from "framer-motion";

const HumanAvatarSVG = ({
  expression = "neutral", // "happy" | "neutral" | "serious"
  speaking = false,
  listening = false,
  thinking = false,
}) => {
  // Eyebrow Variant Mapping
  const eyebrowLeftVariants = {
    neutral: { d: "M155 153 Q175 144 195 148", y: 0 },
    happy: { d: "M155 144 Q175 136 195 144", y: -3 },
    serious: { d: "M155 152 Q175 146 195 156", y: 1 },
    thinking: { d: "M155 142 Q175 142 195 150", y: -4 },
  };

  const eyebrowRightVariants = {
    neutral: { d: "M225 153 Q245 144 265 148", y: 0 },
    happy: { d: "M225 144 Q245 136 265 144", y: -3 },
    serious: { d: "M225 156 Q245 146 265 152", y: 1 },
    thinking: { d: "M225 150 Q245 140 265 146", y: -2 },
  };

  // Pupil/Eye Movement for Active Cognitive States
  const pupilVariants = {
    default: { cx: 0, cy: 0 },
    thinking: {
      cx: [0, 6, 6, 0],
      cy: [0, -4, -4, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  };

  const blinkVariants = {
open: { scaleY:1 },
closed:{
scaleY:[1,0.05,1],
transition:{
duration:.18,
repeat:Infinity,
repeatDelay:4
}
}
}
  // Mouth Shape & Speaking Cycles
  const mouthVariants = {
    neutral: { d: "M185 258 Q210 266 235 258", scaleY: 1 },
    happy: { d: "M182 255 Q210 282 238 255", scaleY: 1 },
    serious: { d: "M185 262 Q210 258 235 262", scaleY: 1 },
    speaking: {
      d: [
        "M185 258 Q210 266 235 258", // closed-ish
        "M188 255 Q210 282 232 255", // wide open
        "M190 258 Q210 272 230 258", // partial open
        "M185 258 Q210 266 235 258",
      ],
      scaleY: [1, 1.4, 0.8, 1],
      transition: {
        duration: 0.45,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Overall Head Movement (Nodding/Breathing)
  const headVariants = {
    idle: { y: 0, rotate: 0 },
    listening: {
      y: [0, 2, 0],
      rotate: [0, 0.5, -0.5, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    thinking: {
      rotate: [0, -1.5, -1.5, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Determine active keys for variations
  const currentExpression = expression || "neutral";
  const mouthAnimState = speaking ? "speaking" : currentExpression;
  const cognitiveAnimState = thinking ? "thinking" : "default";
  const structuralAnimState = thinking
    ? "thinking"
    : listening
    ? "listening"
    : "idle";

  return (
    <svg
      className="human-avatar"
      viewBox="0 0 420 500"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", overflow: "visible" }}
    >
      <defs>
        {/* Professional Skin Gradients */}
       <radialGradient
      id="skinGrad"
    cx="40%"
    cy="25%"
    r="70%"
      >

<stop offset="0%" stopColor="#FFDCC4"/>

<stop offset="35%" stopColor="#F4C3A2"/>

<stop offset="70%" stopColor="#D89A70"/>

<stop offset="100%" stopColor="#B9754E"/>

</radialGradient>
        <linearGradient id="neckGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#C97E57" />
          <stop offset="100%" stopColor="#A8623B" />
        </linearGradient>

        {/* Sharp Executive Business Attire */}
        <linearGradient id="suitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id="tieGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#991B1B" />
        </linearGradient>

        {/* Styled Hair Gradients */}
        <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#374151" />
          <stop offset="70%" stopColor="#1F2937" />
          <stop offset="100%" stopColor="#111827" />
        </linearGradient>

        {/* Dynamic Studio Shadow for Depth */}
        <filter id="naturalShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#0F172A" floodOpacity="0.18" />
        </filter>
        <filter id="headShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000000" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* BACKGROUND ELEMENTS & TORSO (Tied to subtle breathing structure) */}
      <motion.g animate={structuralAnimState} variants={headVariants}>
        {/* Suit Jacket */}
        <path
          d="M60 500 L360 500 L340 375 Q210 335 80 375 Z"
          fill="url(#suitGrad)"
          filter="url(#naturalShadow)"
        />
        <path
d="M140 350 L210 500 L280 350"
fill="#1F2937"
opacity=".35"
/>

        {/* White Dress Shirt Collar */}
        <polygon points="170,335 210,380 250,335" fill="#FFFFFF" />
        <polygon points="182,335 210,368 238,335" fill="#E2E8F0" />

        {/* Professional Necktie */}
        <polygon points="202,360 218,360 224,470 210,490 196,470" fill="url(#tieGrad)" />
        <polygon points="205,360 215,360 218,400 210,405 202,400" fill="#B91C1C" opacity="0.8" />

        {/* Neck */}
        <rect x="185" y="284" width="50" height="70" rx="10" fill="url(#neckGrad)" />
        {/* Neck shadow under chin */}
        <path d="M185 284 Q210 302 235 284 L235 285 Q210 300 185 285 Z" fill="#7C4123" opacity="0.3" />
      </motion.g>

      {/* HEAD STRUCTURE (Animated dynamically for expressions, speaking, listening, and thinking) */}
      <motion.g
        animate={structuralAnimState}
        variants={headVariants}
        style={{ transformOrigin: "210px 270px" }}
      >
        {/* Ears */}
        <ellipse cx="118" cy="185" rx="16" ry="26" fill="url(#skinGrad)" transform="rotate(-5 118 185)" />
        <ellipse cx="302" cy="185" rx="16" ry="26" fill="url(#skinGrad)" transform="rotate(5 302 185)" />
        
        {/* Inner Ear Details */}
        <path d="M120 175 Q114 185 122 192" stroke="#A8623B" strokeWidth="2" fill="none" opacity="0.6" />
        <path d="M300 175 Q306 185 298 192" stroke="#A8623B" strokeWidth="2" fill="none" opacity="0.6" />

        {/* Face Base */}
        <ellipse
cx="175"
cy="185"
rx="18"
ry="12"
fill="white"
opacity=".08"
/>

<ellipse
cx="245"
cy="185"
rx="18"
ry="12"
fill="white"
opacity=".08"
/>
        <ellipse cx="210" cy="180" rx="102" ry="122" fill="url(#skinGrad)" filter="url(#headShadow)" />

        {/* Hair Base */}
    <path
    d="
    M112 170
    Q118 60 210 48
    Q302 60 308 170

    Q300 120 270 95
    Q240 75 210 74
    Q180 75 150 95
    Q120 120 112 170
    Z"
    fill="url(#hairGrad)"
/>
        {/* Eyebrows (Dynamic Morphing) */}
        <motion.path
          animate={currentExpression}
          variants={eyebrowLeftVariants}
          transition={{ duration: 0.3 }}
          stroke="#27272A"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />
        <motion.path
          animate={currentExpression}
          variants={eyebrowRightVariants}
          transition={{ duration: 0.3 }}
          stroke="#27272A"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Eyes & Eyelashes */}
        <g id="eyes-group">
          {/* Left Eye Sclera */}
          <ellipse cx="174" cy="192" rx="15" ry="10" fill="#FFFFFF" stroke="#DEE2E6" strokeWidth="0.5" />
          {/* Right Eye Sclera */}
          <ellipse cx="246" cy="192" rx="15" ry="10" fill="#FFFFFF" stroke="#DEE2E6" strokeWidth="0.5" />

          {/* Pupils & Irises (Saccades & Thinking movements) */}
          <g>
            {/* Left Iris */}
            <motion.circle
              cx="174"
              cy="192"
              r="6.5"
              fill="#2563EB" // Corporate Blue Eyes
              animate={cognitiveAnimState}
              variants={pupilVariants}
            />
            {/* Left Pupil */}
            <motion.circle
              cx="174"
              cy="192"
              r="3"
              fill="#0F172A"
              animate={cognitiveAnimState}
              variants={pupilVariants}
            />
            {/* Left Eye Glint */}
            <motion.circle
              cx="172"
              cy="189"
              r="1.2"
              fill="#FFFFFF"
              animate={cognitiveAnimState}
              variants={pupilVariants}
            />

            {/* Right Iris */}
            <motion.circle
              cx="246"
              cy="192"
              r="6.5"
              fill="#2563EB"
              animate={cognitiveAnimState}
              variants={pupilVariants}
            />
            {/* Right Pupil */}
            <motion.circle
              cx="246"
              cy="192"
              r="3"
              fill="#0F172A"
              animate={cognitiveAnimState}
              variants={pupilVariants}
            />
            {/* Right Eye Glint */}
            <motion.circle
              cx="244"
              cy="189"
              r="1.2"
              fill="#FFFFFF"
              animate={cognitiveAnimState}
              variants={pupilVariants}
            />
          </g>

          {/* Eyelids/Shadow Top Rim */}
          <path d="M159 190 Q174 181 189 190" stroke="#475569" strokeWidth="1.5" fill="none" opacity="0.4" />
          <path d="M231 190 Q246 181 261 190" stroke="#475569" strokeWidth="1.5" fill="none" opacity="0.4" />
        </g>

        {/* Refined Geometric Nose */}
        <path d="M210 192 L206 230 Q210 238 214 230 Z" fill="#D48B63" opacity="0.4" />
        <path d="M206 216 Q210 219 214 216" stroke="#C27A53" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Mouth Structure (Handles Real-time Speaking Animations vs Expression States) */}
        <motion.path
          animate={mouthAnimState}
          variants={mouthVariants}
          stroke="#991B1B"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          style={{ transformOrigin: "210px 248px" }}
        />

        {/* Modern Front Hairline Styling / Executive Cut */}
        <path
d="
M120 148

Q145 95 205 88

Q260 82 295 130

Q280 118 255 112

Q225 103 205 104

Q175 105 150 115

Q132 122 120 148
Z"
fill="#111827"
/>
        <path
      d="
M145 100

Q190 82 240 90

Q270 95 285 115

Q245 100 205 98

Q170 98 145 110
Z"
fill="#6B7280"
opacity=".22"
/>
<path
d="M175 86 Q190 80 205 82"
stroke="#0F172A"
strokeWidth="2"
strokeLinecap="round"
/>

<path
d="M195 82 Q215 76 235 82"
stroke="#0F172A"
strokeWidth="2"
strokeLinecap="round"
/>

<path
d="M215 84 Q235 82 252 90"
stroke="#0F172A"
strokeWidth="2"
strokeLinecap="round"
/>
        {/* Subtle Chin Definition */}
        <ellipse cx="210" cy="288" rx="14" ry="4" fill="#FFFFFF" opacity="0.25" />
      </motion.g>
    </svg>
  );
};

export default HumanAvatarSVG;
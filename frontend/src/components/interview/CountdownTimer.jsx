import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

export default function CountdownTimer({
  duration = 10,
  running = false,
  title = "Preparing...",
  color = "#3b82f6",
  size = 180,
  strokeWidth = 10,
  onComplete,
}) {
  const [timeLeft, setTimeLeft] = useState(duration);

  const completed = useRef(false);

  // Reset timer whenever duration changes
  useEffect(() => {
    setTimeLeft(duration);
    completed.current = false;
  }, [duration]);

  // Countdown
  useEffect(() => {
    if (!running) return;

    if (timeLeft <= 0) {
      if (!completed.current) {
        completed.current = true;
        onComplete?.();
      }
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [running, timeLeft, onComplete]);

  const radius = (size - strokeWidth) / 2;

  const circumference = 2 * Math.PI * radius;

  const progress = timeLeft / duration;

  const offset = circumference * (1 - progress);

  return (
    <div
      className="countdown-container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 18,
      }}
    >
      <div
        style={{
          fontWeight: 600,
          fontSize: 18,
        }}
      >
        {title}
      </div>

      <div
        style={{
          position: "relative",
          width: size,
          height: size,
        }}
      >
        <svg
          width={size}
          height={size}
          style={{
            transform: "rotate(-90deg)",
          }}
        >
          {/* Background */}

          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
          />

          {/* Progress */}

          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{
              strokeDashoffset: offset,
            }}
            transition={{
              duration: 0.8,
            }}
          />
        </svg>

        {/* Center */}

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Clock
            size={28}
            color={color}
          />

          <motion.div
            key={timeLeft}
            initial={{
              scale: 0.7,
            }}
            animate={{
              scale: 1,
            }}
            transition={{
              duration: 0.2,
            }}
            style={{
              fontSize: 40,
              fontWeight: 700,
              marginTop: 8,
            }}
          >
            {timeLeft}
          </motion.div>

          <div
            style={{
              color: "#64748b",
              fontSize: 13,
            }}
          >
            seconds
          </div>
        </div>
      </div>

      {running ? (
        <span
          style={{
            color,
            fontWeight: 600,
          }}
        >
          Timer Running...
        </span>
      ) : (
        <span
          style={{
            color: "#64748b",
          }}
        >
          Waiting...
        </span>
      )}
    </div>
  );
}
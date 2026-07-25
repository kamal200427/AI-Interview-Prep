import { motion } from "framer-motion";
import HumanAvatarSVG from "./HumanAvatarSVG";
import { avatarVariants, cameraVariants } from "./avatarAnimations";

export default function AvatarCamera({
  status = "idle",
  expression = "neutral",
  speaking = false,
  listening = false,
  thinking = false,
  mouthOpen = false,
  blink = false,
}) {
  return (
    <motion.div
      className="avatar-camera"
      variants={cameraVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background Glow */}
      <div className={`camera-glow ${status}`} />

      {/* Camera Header */}
      <div className="camera-header">
        <div className="camera-indicator">
          <span className="camera-dot" />
          AI Interviewer
        </div>

        <div className="camera-live">
          <span className="live-dot" />
          LIVE
        </div>
      </div>

      {/* Camera Body */}
      <motion.div
        className="camera-body"
        variants={avatarVariants}
        animate={status}
      >
        <HumanAvatarSVG
          expression={expression}
          speaking={speaking}
          listening={listening}
          thinking={thinking}
          mouthOpen={mouthOpen}
          blink={blink}
        />
      </motion.div>

      {/* Bottom Overlay */}
      <div className="camera-footer">
        <div className="camera-name">
          AI Interview Assistant
        </div>

        <div className="camera-status">
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
      </div>
    </motion.div>
  );
}
import { motion, AnimatePresence } from "framer-motion";

import {
  visualizerVariants,
  audioBarAnimation,
} from "./avatarAnimations";

const TOTAL_BARS = 21;

export default function AudioVisualizer({

  status = "idle",

}) {

  const active =
    status === "speaking" ||
    status === "listening";

  return (

    <AnimatePresence>

      {active && (

        <motion.div

          className="audio-visualizer"

          variants={visualizerVariants}

          initial="hidden"

          animate="visible"

          exit="hidden"

        >

          {[...Array(TOTAL_BARS)].map((_, index) => (

            <motion.span

              key={index}

              className={`audio-bar ${status}`}

              animate={

                audioBarAnimation(index).animate

              }

              transition={

                audioBarAnimation(index).transition

              }

            />

          ))}

        </motion.div>

      )}

    </AnimatePresence>

  );

}
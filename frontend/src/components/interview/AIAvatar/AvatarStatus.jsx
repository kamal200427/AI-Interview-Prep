import { motion } from "framer-motion";
import {
  Volume2,
  Ear,
  BrainCircuit,
  Circle,
} from "lucide-react";

import { statusVariants } from "./avatarAnimations";

const STATUS = {

  idle:{

    label:"Waiting",

    icon:Circle,

    color:"#94A3B8",

    bg:"rgba(148,163,184,.10)",

    border:"rgba(148,163,184,.25)",

  },

  speaking:{

    label:"Interviewer Speaking",

    icon:Volume2,

    color:"#3B82F6",

    bg:"rgba(59,130,246,.12)",

    border:"rgba(59,130,246,.35)",

  },

  listening:{

    label:"Listening",

    icon:Ear,

    color:"#10B981",

    bg:"rgba(16,185,129,.12)",

    border:"rgba(16,185,129,.35)",

  },

  thinking:{

    label:"Analyzing Answer",

    icon:BrainCircuit,

    color:"#F59E0B",

    bg:"rgba(245,158,11,.12)",

    border:"rgba(245,158,11,.35)",

  },

};

export default function AvatarStatus({

    status="idle",

}){

    const current = STATUS[status] || STATUS.idle;

    const Icon = current.icon;

    return(

        <motion.div

            className="avatar-status"

            variants={statusVariants}

            initial="hidden"

            animate="visible"

            style={{

                color:current.color,

                background:current.bg,

                borderColor:current.border,

            }}

        >

            <motion.div

                animate={

                    status==="idle"

                    ? {}

                    : {

                        scale:[1,1.15,1],

                    }

                }

                transition={{

                    repeat:Infinity,

                    duration:1.2,

                }}

            >

                <Icon size={18}/>

            </motion.div>

            <span>

                {current.label}

            </span>

        </motion.div>

    );

}
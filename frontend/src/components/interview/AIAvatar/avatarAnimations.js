// =============================================
// avatarAnimations.js
// Framer Motion Variants for AI Interviewer
// =============================================

/*
|--------------------------------------------------------------------------
| Avatar Animation
|--------------------------------------------------------------------------
*/

export const avatarVariants = {

    idle: {

        scale: 1,

        rotate: 0,

        y: 0,

        boxShadow: "0 0 12px rgba(59,130,246,.15)",

        transition: {

            duration: 0.4,

        },

    },

    speaking: {

        scale: [1, 1.015, 1],

        y: [0, -2, 0],

        boxShadow: [

            "0 0 20px rgba(59,130,246,.35)",

            "0 0 45px rgba(59,130,246,.55)",

            "0 0 20px rgba(59,130,246,.35)",

        ],

        transition: {

            repeat: Infinity,

            duration: 1.5,

            ease: "easeInOut",

        },

    },

    listening: {

        scale: [1, 1.01, 1],

        boxShadow: [

            "0 0 18px rgba(16,185,129,.25)",

            "0 0 35px rgba(16,185,129,.45)",

            "0 0 18px rgba(16,185,129,.25)",

        ],

        transition: {

            repeat: Infinity,

            duration: 2,

            ease: "easeInOut",

        },

    },

    thinking: {

        rotate: [0, -1, 1, -1, 0],

        boxShadow: [

            "0 0 18px rgba(245,158,11,.25)",

            "0 0 40px rgba(245,158,11,.55)",

            "0 0 18px rgba(245,158,11,.25)",

        ],

        transition: {

            repeat: Infinity,

            duration: 1.8,

            ease: "easeInOut",

        },

    },

};

/*
|--------------------------------------------------------------------------
| Status Badge
|--------------------------------------------------------------------------
*/

export const statusVariants = {

    hidden: {

        opacity: 0,

        y: -15,

        scale: 0.9,

    },

    visible: {

        opacity: 1,

        y: 0,

        scale: 1,

        transition: {

            duration: 0.35,

        },

    },

};

/*
|--------------------------------------------------------------------------
| Audio Visualizer Container
|--------------------------------------------------------------------------
*/

export const visualizerVariants = {

    hidden: {

        opacity: 0,

        scale: 0.9,

    },

    visible: {

        opacity: 1,

        scale: 1,

        transition: {

            duration: 0.4,

        },

    },

};

/*
|--------------------------------------------------------------------------
| Transcript Panel
|--------------------------------------------------------------------------
*/

export const transcriptVariants = {

    hidden: {

        opacity: 0,

        y: 20,

    },

    visible: {

        opacity: 1,

        y: 0,

        transition: {

            duration: 0.4,

        },

    },

    exit: {

        opacity: 0,

        y: -15,

        transition: {

            duration: 0.25,

        },

    },

};

/*
|--------------------------------------------------------------------------
| Camera Frame
|--------------------------------------------------------------------------
*/

export const cameraVariants = {

    hidden: {

        opacity: 0,

        scale: 0.96,

    },

    visible: {

        opacity: 1,

        scale: 1,

        transition: {

            duration: 0.5,

        },

    },

};

/*
|--------------------------------------------------------------------------
| Message Bubble
|--------------------------------------------------------------------------
*/

export const messageVariants = {

    hidden: {

        opacity: 0,

        y: 20,

    },

    visible: {

        opacity: 1,

        y: 0,

        transition: {

            duration: 0.4,

        },

    },

};

/*
|--------------------------------------------------------------------------
| Floating Glow
|--------------------------------------------------------------------------
*/

export const glowVariants = {

    idle: {

        opacity: .25,

    },

    speaking: {

        opacity: [.35, .6, .35],

        scale: [1, 1.08, 1],

        transition: {

            repeat: Infinity,

            duration: 2,

        },

    },

    listening: {

        opacity: [.25, .45, .25],

        scale: [1, 1.03, 1],

        transition: {

            repeat: Infinity,

            duration: 2,

        },

    },

    thinking: {

        opacity: [.25, .5, .25],

        transition: {

            repeat: Infinity,

            duration: 1.5,

        },

    },

};

/*
|--------------------------------------------------------------------------
| Audio Bars
|--------------------------------------------------------------------------
*/

export const audioBarAnimation = (index = 0) => ({

    animate: {

        height: [

            8,

            24 + (index % 3) * 8,

            12,

            42 - (index % 2) * 6,

            10,

        ],

    },

    transition: {

        repeat: Infinity,

        duration: 0.65,

        delay: index * 0.08,

        ease: "easeInOut",

    },

});
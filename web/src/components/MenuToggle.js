import React from "react"
import { motion } from "framer-motion";

const Path = props => (
    <motion.path
        fill="transparent"
        strokeWidth="3"
        stroke={`${props.white ? 'hsl(0, 0%, 100%)' : 'hsl(115, 10%, 24%)'}`}
        strokeLinecap="round"
        {...props}
    />
);

export const MenuToggle = ({ toggle, white }) => (
    <button onClick={toggle} className="absolute z-10">
        <svg width="23" height="23" viewBox="0 0 23 23">
            <Path
                variants={{
                    closed: { d: "M 2 2.5 L 20 2.5" },
                    open: { d: "M 3 16.5 L 17 2.5" }
                }}
                white={white}
            />
            <Path
                d="M 2 9.423 L 20 9.423"
                variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 }
                }}
                transition={{ duration: 0.1 }}
                white={white}
            />
            <Path
                variants={{
                    closed: { d: "M 2 16.346 L 20 16.346" },
                    open: { d: "M 3 2.5 L 17 16.346" }
                }}
                white={white}
            />
        </svg>
    </button>
);
import React from 'react';
import { motion } from 'framer-motion';

interface HeroCardProps {
    icon: React.ReactNode;
    title: string;
    gradient: string;
    delay: number;
    xOffset: number;
}

const HeroCard: React.FC<HeroCardProps> = ({ icon, title, gradient, delay, xOffset }) => {
    const [isLargeScreen, setIsLargeScreen] = React.useState(false);

    React.useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 1024);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, x: isLargeScreen ? 50 : 0, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay, ease: "easeOut" }}
            className="relative group w-full lg:w-auto flex justify-center lg:justify-end"
            style={{
                marginLeft: isLargeScreen ? `${xOffset}px` : '0px'
            }}
        >
            {/* Continuous Floating Animation */}
            <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: delay * 2 }}
                className="relative flex items-center gap-4 md:gap-5 p-4 md:p-5 pr-8 md:pr-12 rounded-xl md:rounded-2xl border border-white/20 bg-surface/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_60px_rgba(133,169,71,0.2)] overflow-hidden w-full max-w-[320px] lg:min-w-[320px] transition-all duration-500"
            >
                {/* Hover State Layer */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/5"></div>

                {/* Bright Professional Accent Border */}
                <div className={`absolute left-0 top-0 bottom-0 w-[5px] bg-gradient-to-b ${gradient} shadow-[0_0_15px_rgba(133,169,71,0.5)]`}></div>

                {/* Brighter Icon Box with Shadow */}
                <div className={`relative p-3 rounded-lg md:rounded-xl bg-gradient-to-br ${gradient} text-white shadow-[0_8px_20px_rgba(0,0,0,0.4)] z-10 shrink-0 transform group-hover:scale-110 transition-transform duration-500`}>
                    <div className="scale-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                        {icon}
                    </div>
                    {/* Glossy Overlay */}
                    <div className="absolute inset-0 rounded-lg md:rounded-xl bg-white/30 opacity-40 mix-blend-overlay"></div>
                </div>

                {/* Text with high readability */}
                <div className="z-10 flex flex-col">
                    <h4 className="text-white font-sans text-xs md:text-sm font-black tracking-[0.15em] uppercase leading-tight drop-shadow-sm">
                        {title}
                    </h4>
                </div>

                {/* Animated Sheen Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 translate-x-[-250%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-in-out pointer-events-none"></div>
            </motion.div>
        </motion.div>
    );
};

export default HeroCard;
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface LoaderProps {
  isLoading: boolean;
}

const Loader = ({ isLoading }: LoaderProps) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    let start = 0;
    const interval = setInterval(() => {
      start += 3;
      if (start <= 100) {
        setPercent(start);
      } else {
        clearInterval(interval);
      }
    }, 5);

    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <h2 className="font-display text-2xl font-bold tracking-tight">
              <span className="gradient-text">Loading</span>
            </h2>

            <p className="text-muted-foreground mt-2 text-sm tracking-wide">
              {percent}%
            </p>

            <motion.div className="mt-4 h-0.5 w-80 mx-auto rounded-full overflow-hidden bg-muted">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, hsl(239 84% 67%), hsl(270 75% 60%))",
                }}
                initial={{ width: "0%" }}
                animate={{ width: `${percent}%` }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
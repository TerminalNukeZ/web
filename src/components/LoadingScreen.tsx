import { useEffect, useState } from "react";
import logo from "@/assets/furious-nodes-logo.png";
import { Progress } from "@/components/ui/progress";

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

export const LoadingScreen = ({ onLoadComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Start exit animation
          setTimeout(() => {
            setIsExiting(true);
            // Complete loading after animation
            setTimeout(() => {
              onLoadComplete();
            }, 500);
          }, 300);
          return 100;
        }
        // Increment progress with varying speed for realistic effect
        const increment = Math.random() * 15 + 10;
        return Math.min(prev + increment, 100);
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-background flex items-center justify-center transition-opacity duration-500 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="w-full max-w-md px-8 space-y-8 animate-fade-in">
        {/* Logo */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-full animate-pulse" />
            <img
              src={logo}
              alt="Furious Nodes"
              className="h-24 w-24 relative z-10 animate-scale-in"
              style={{ animationDelay: "0.1s" }}
            />
          </div>
          
          <h1
            className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Furious Nodes
          </h1>
        </div>

        {/* Loading Bar */}
        <div
          className="space-y-3 animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <Progress value={progress} className="h-2" />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Loading...</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

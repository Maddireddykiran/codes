"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Logo {
  id: number;
  img: string;
  alt: string;
}

export const InfiniteMovingLogos = ({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
}: {
  items: Logo[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  const addAnimation = () => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  };

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  useEffect(() => {
    addAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-full overflow-hidden",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-8 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((logo) => (
          <li
            key={logo.id}
            className="relative flex-shrink-0 px-3 py-2"
          >
            <div className={cn(
              "flex items-center justify-center transition-all duration-300 hover:scale-105",
              // Smaller height on large screens
              "h-14 sm:h-16 md:h-18 lg:h-16",
              // Special size for Adobe logo
              logo.alt === "Adobe Logo" && "h-16 sm:h-20 md:h-24 lg:h-20"
            )}>
              <Image
                src={logo.img}
                alt={logo.alt}
                width={logo.alt === "Adobe Logo" ? 160 : 120}
                height={logo.alt === "Adobe Logo" ? 80 : 60}
                className={cn(
                  "w-auto object-contain brightness-90 hover:brightness-100 transition-all",
                  // Scale height based on logo type
                  logo.alt === "Adobe Logo" ? "h-[90%]" : "h-full"
                )}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}; 
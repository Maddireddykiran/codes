"use client";

import Link from "next/link";
import { FaLocationArrow } from "react-icons/fa6";
import { Spotlight } from "@/components/ui/spotlight";
import { MagicButton } from "@/components/ui/magic-button";
import { AIMLScene } from "@/components/ui/ai-ml-scene";
import { useEffect, useState } from "react";

interface HeroData {
  professionTitle: string;
  heading: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  image: string;
}

export const Hero = () => {
  const [heroData, setHeroData] = useState<HeroData>({
    professionTitle: "AI & AUTOMATION EXPERT | SENIOR MANAGER AT DELOITTE DIGITAL",
    heading: "Crafting Intelligent Digital Experiences with AI",
    description: "Hi, I'm Naveen, a Senior Manager and AI expert specializing in digital transformation using AI, ML, and Adobe Experience Manager (AEM). I build intelligent, scalable platforms that modernize legacy systems and enhance user experiences.",
    ctaText: "Contact Me",
    ctaLink: "#contact",
    image: "/profile.svg"
  });

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch('/api/content/hero');
        if (response.ok) {
          const data = await response.json();
          setHeroData(data);
        }
      } catch (error) {
        console.error('Error fetching hero data:', error);
      }
    };

    fetchHeroData();
  }, []);

  return (
    <section id="home" className="pb-12 pt-24 md:pt-32 relative min-h-screen flex items-center">
      {/* Spotlights */}
      <div>
        <Spotlight
          className="-left-10 -top-20 h-[60vh] md:-left-32 md:-top-20 md:h-screen"
          fill="white"
        />
        <Spotlight
          className="left-full top-10 h-[60vh] w-[50vw] md:h-[80vh]"
          fill="purple"
        />
        <Spotlight
          className="left-80 top-28 h-[60vh] w-[50vw] md:h-[80vh]"
          fill="blue"
        />
      </div>

      {/* Background Grid Overlay */}
      <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-white bg-grid-black/[0.2] dark:bg-black-100 dark:bg-grid-white/[0.03]">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black-100" />
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col justify-center lg:flex-row lg:items-center lg:gap-8 mt-10 md:mt-12">
        {/* Text Content */}
        <div className="flex w-full flex-col items-center justify-center md:max-w-2xl lg:max-w-[40vw] lg:items-start">
          <h2 className="text-center lg:text-left text-xs sm:text-sm uppercase tracking-widest text-blue-100 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text font-semibold">
            {heroData.professionTitle}
          </h2>

          <h1 className="text-center lg:text-left my-3 text-[32px] sm:text-[40px] md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-tight">
            {heroData.heading}
          </h1>

          <p className="mb-5 text-center lg:text-left text-sm sm:text-base tracking-normal leading-relaxed text-gray-300 max-w-[95vw] sm:max-w-[80vw] md:max-w-xl">
            {heroData.description}
          </p>

          {/* Buttons */}
          <div className="flex gap-3 sm:gap-4">
            <Link href="#about">
              <div className="transition-transform duration-300 ease-in-out hover:bg-blue-600 hover:text-white hover:scale-105 rounded-md">
                <MagicButton
                  title="View my work"
                  icon={<FaLocationArrow />}
                  position="right"
                  asChild
                />
              </div>
            </Link>

            <Link href={heroData.ctaLink}>
              <div className="transition-transform duration-300 ease-in-out hover:bg-green-600 hover:text-white hover:scale-105 rounded-md">
                <MagicButton
                  title={heroData.ctaText}
                  variant="outline"
                  asChild
                />
              </div>
            </Link>
          </div>
        </div>

        {/* AI/ML Scene */}
        <div className="mt-8 w-full lg:mt-0 lg:w-1/2">
          <div className="relative">
            <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 opacity-75 blur-xl" />
            <div className="relative overflow-hidden rounded-lg">
              <AIMLScene />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

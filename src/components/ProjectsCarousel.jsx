import React, { useState, useRef, useEffect } from 'react';
import { projectsData } from '../data/portfolioData';

export default function ProjectsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const carouselRef = useRef(null);
  const dragState = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
    velX: 0,
    lastX: 0,
    lastTime: 0,
    momentumId: null,
    scrollAnimId: null,
  });

  // Clean up any running animation frames on unmount
  useEffect(() => {
    return () => {
      if (dragState.current.momentumId) cancelAnimationFrame(dragState.current.momentumId);
      if (dragState.current.scrollAnimId) cancelAnimationFrame(dragState.current.scrollAnimId);
    };
  }, []);

  // Custom GPU-friendly requestAnimationFrame smooth scroll for buttons & dots
  const animateScrollTo = (targetLeft, duration = 650) => {
    if (!carouselRef.current) return;
    if (dragState.current.momentumId) cancelAnimationFrame(dragState.current.momentumId);
    if (dragState.current.scrollAnimId) cancelAnimationFrame(dragState.current.scrollAnimId);

    const container = carouselRef.current;
    const startLeft = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;
    const clampedTarget = Math.max(0, Math.min(maxScroll, targetLeft));
    const distance = clampedTarget - startLeft;

    if (Math.abs(distance) < 1) return;

    const startTime = performance.now();
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      container.scrollLeft = startLeft + distance * easeOutQuart(progress);

      if (progress < 1) {
        dragState.current.scrollAnimId = requestAnimationFrame(step);
      } else {
        dragState.current.scrollAnimId = null;
      }
    };

    dragState.current.scrollAnimId = requestAnimationFrame(step);
  };

  // Mouse Click-and-Drag Handlers with Smooth Momentum Coasting
  const handleMouseDown = (e) => {
    if (e.target.closest('button') || e.target.closest('a')) return;
    if (!carouselRef.current) return;

    if (dragState.current.momentumId) cancelAnimationFrame(dragState.current.momentumId);
    if (dragState.current.scrollAnimId) cancelAnimationFrame(dragState.current.scrollAnimId);

    dragState.current.isDown = true;
    dragState.current.startX = e.pageX - carouselRef.current.offsetLeft;
    dragState.current.scrollLeft = carouselRef.current.scrollLeft;
    dragState.current.lastX = e.pageX;
    dragState.current.lastTime = performance.now();
    dragState.current.velX = 0;
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!dragState.current.isDown || !carouselRef.current) return;
    e.preventDefault();

    const now = performance.now();
    const dt = Math.max(1, now - dragState.current.lastTime);
    const dx = e.pageX - dragState.current.lastX;

    dragState.current.velX = dx / dt;
    dragState.current.lastX = e.pageX;
    dragState.current.lastTime = now;

    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - dragState.current.startX) * 1.15;
    carouselRef.current.scrollLeft = dragState.current.scrollLeft - walk;
  };

  const stopDragging = () => {
    if (!dragState.current.isDown) return;
    dragState.current.isDown = false;
    setIsDragging(false);

    let velocity = dragState.current.velX * 16;
    if (Math.abs(velocity) > 1.5 && carouselRef.current) {
      const coast = () => {
        if (!carouselRef.current) return;
        carouselRef.current.scrollLeft -= velocity;
        velocity *= 0.93;
        if (Math.abs(velocity) > 0.4) {
          dragState.current.momentumId = requestAnimationFrame(coast);
        } else {
          dragState.current.momentumId = null;
        }
      };
      dragState.current.momentumId = requestAnimationFrame(coast);
    }
  };

  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;
    const scrollAmount = window.innerWidth < 640 ? 320 : 444;
    const target =
      carouselRef.current.scrollLeft +
      (direction === 'left' ? -scrollAmount : scrollAmount);
    animateScrollTo(target, 650);
  };

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const scrollLeft = carouselRef.current.scrollLeft;
    const cardStep = window.innerWidth < 640 ? 320 : 444;
    const approxIndex = Math.min(
      projectsData.length - 1,
      Math.max(0, Math.round(scrollLeft / cardStep))
    );
    setActiveIndex(approxIndex);
  };

  return (
    <div className="relative">
      {/* Carousel Track (Click-and-Drag enabled) */}
      <div
        ref={carouselRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
        className={`flex gap-6 overflow-x-auto no-scrollbar pb-5 pt-1 items-stretch select-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        {projectsData.map((project) => {
          return (
            <div
              key={project.id}
              style={{
                transform: 'translate3d(0, 0, 0)',
                backfaceVisibility: 'hidden',
              }}
              className="group relative shrink-0 rounded-2xl overflow-hidden border border-[#384545]/30 hover:border-[#8A7059] transition-all duration-300 shadow-xl bg-[#2D3838] text-[#F5F2EB] w-[86vw] max-w-[340px] sm:max-w-none sm:w-[420px] h-[375px] pt-5 px-4 pb-3.5 sm:pt-5.5 sm:px-4 sm:pb-3.5 flex flex-col justify-between"
            >
              {/* Top Text Block */}
              <div className="z-10 relative px-1">
                <span className="font-mono text-xs uppercase tracking-wider text-[#C5A88E] block mb-1">
                  {project.subtitle}
                </span>
                <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mb-1.5">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  {project.shortDesc}
                </p>
              </div>

              {/* Slimmer Inset Window Frame - Pushed Up, Consistent Size Across Cards */}
              <div
                className={`relative w-full h-[200px] shrink-0 mt-3 rounded-xl overflow-hidden border border-white/10 shadow-inner ${
                  project.imageBg || 'bg-[#182121]'
                }`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  draggable={false}
                  style={{
                    backfaceVisibility: 'hidden',
                  }}
                  className={`w-full h-full ${
                    project.imageClass || 'object-cover object-top'
                  } will-change-transform transition-transform duration-700 group-hover:scale-105 pointer-events-none select-none`}
                  loading="lazy"
                />

                {/* Action Buttons Floating on the Photo (Bottom-Right) */}
                <div className="absolute bottom-2.5 right-2.5 z-20 flex items-center gap-1.5">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} source code on GitHub`}
                      title="Source Code"
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center bg-[#8A7059] text-white border border-white/20 hover:bg-[#9D8269] hover:scale-105 transition-all duration-300 shadow-md"
                    >
                      <svg
                        className="w-4.5 h-4.5 sm:w-5 sm:h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        />
                      </svg>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${project.title} live demo`}
                      title="Live Demo"
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center bg-[#8A7059] text-white border border-[#8A7059] hover:bg-[#9D8269] hover:scale-105 transition-all duration-300 shadow-md"
                    >
                      <svg
                        className="w-4 h-4 sm:w-4.5 sm:h-4.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Controls: Pagination Dots + Navigation Buttons */}
      <div className="flex items-center justify-between mt-6 pt-2">
        <div className="flex items-center gap-2.5">
          {projectsData.map((p, idx) => {
            const isCurrent = idx === activeIndex;
            return (
              <button
                key={p.id}
                onClick={() => {
                  setActiveIndex(idx);
                  if (carouselRef.current && carouselRef.current.children[idx]) {
                    animateScrollTo(
                      carouselRef.current.children[idx].offsetLeft,
                      650
                    );
                  }
                }}
                aria-label={`Scroll to ${p.title}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  isCurrent
                    ? 'w-8 bg-[#8A7059]'
                    : 'w-2.5 bg-[#384545]/30 hover:bg-[#384545]/60'
                }`}
              />
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => scrollCarousel('left')}
            aria-label="Previous projects"
            className="w-11 h-11 rounded-full bg-[#384545] text-[#F5F2EB] hover:bg-[#8A7059] shadow-md flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollCarousel('right')}
            aria-label="Next projects"
            className="w-11 h-11 rounded-full bg-[#384545] text-[#F5F2EB] hover:bg-[#8A7059] shadow-md flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

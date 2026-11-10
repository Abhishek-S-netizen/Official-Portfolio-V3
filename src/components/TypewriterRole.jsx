import React, { useState, useEffect } from 'react';

export default function TypewriterRole({ roles }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typeSpeed = isDeleting ? 40 : 85;

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentRole) {
        setTimeout(() => setIsDeleting(true), 1600);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        setDisplayText(
          currentRole.substring(0, displayText.length + (isDeleting ? -1 : 1))
        );
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, roles]);

  return (
    <div className="h-9 flex items-center">
      <span className="text-xl md:text-2xl font-medium tracking-tight text-[#384545]">
        {displayText}
      </span>
      <span
        className="inline-block w-[2.5px] h-6 ml-1.5 bg-[#8A7059] animate-pulse"
        aria-hidden="true"
      />
    </div>
  );
}

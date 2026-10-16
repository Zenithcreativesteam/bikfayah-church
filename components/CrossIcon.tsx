import React from 'react';

interface CrossIconProps {
  className?: string;
  size?: number;
  color?: string;
}

export default function CrossIcon({ className = '', size = 24, color = 'currentColor' }: CrossIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="10" y="2" width="4" height="20" rx="1" fill={color} />
      <rect x="2" y="7" width="20" height="4" rx="1" fill={color} />
    </svg>
  );
}

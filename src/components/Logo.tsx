import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export const NexloreLogo: React.FC<LogoProps> = ({ className = '', iconOnly = false }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Nexlore Icon */}
      <div className="w-10 h-10 relative flex-shrink-0">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-[#00f2ff]/30 blur-xl rounded-2xl" />
        
        {/* Main box */}
        <div className="absolute inset-0 bg-[#0066FF] rounded-2xl flex items-center justify-center overflow-hidden shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00A3FF] to-[#0057FF] opacity-90" />
          
          {/* Stylized 'N' from the image */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full p-2.5 relative z-10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30 70V40C30 34.4772 34.4772 30 40 30H55L65 70H80V80H60L50 40H40V70C40 75.5228 35.5228 80 30 80V70Z"
              fill="white"
              fillOpacity="0.9"
            />
            <path
              d="M25 70C25 78.2843 31.7157 85 40 85H75V70H40V30H75V15H40C31.7157 15 25 21.7157 25 30V70Z"
              stroke="white"
              strokeWidth="2"
              className="opacity-20"
            />
          </svg>
        </div>
      </div>

      {!iconOnly && (
        <span className="font-display font-black text-2xl tracking-tighter text-white">
          Nexlore
        </span>
      )}
    </div>
  );
};

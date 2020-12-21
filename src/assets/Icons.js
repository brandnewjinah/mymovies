import React from "react";

export const ArrowRight = ({ width, height, stroke, color, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
};

export const ArrowRightLong = ({ width, height, stroke, color, fill }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 18"
      fill="none"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.009 10.509h19.606M16.106 5l5.509 5.509-5.509 5.51" />
    </svg>
  );
};

export const BrokenHeart = ({ width, height, stroke, color, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={fill}
      viewBox="0 0 437.775 437.774"
    >
      <path d="M437.775 150.801c0 110.478-218.893 257.212-218.893 257.212S0 266.569 0 150.801c0-83.217 54.202-121.04 121.041-121.04 30.946 0 59.093 11.7 80.463 30.818l-55.744 80.925a9.077 9.077 0 002.571 12.785l82.958 53.309-38.178 46.08a9.063 9.063 0 00-1.726 8.322l21.359 73.672c1.144 3.955 4.764 6.55 8.709 6.55.703 0 1.425-.089 2.137-.255 4.72-1.135 7.705-5.786 6.789-10.551l-12.975-67.033 54.456-54.725a9.088 9.088 0 002.624-6.966 9.05 9.05 0 00-3.476-6.593l-71.732-55.925 77.963-93.629a9.086 9.086 0 002.033-6.845 9.046 9.046 0 00-1.194-3.552 120.078 120.078 0 0138.633-6.387c66.863 0 121.064 54.201 121.064 121.04z" />
    </svg>
  );
};

export const Checkmark = ({ width, height, stroke, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
};

export const ChevronDown = ({ width, height, stroke, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );
};

export const Ex = ({ width, height, stroke, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );
};

export const Heart = ({ width, height, stroke, color, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  );
};

export const Film = ({ width, height, stroke, color, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x={2} y={2} width={20} height={20} rx={2.18} ry={2.18} />
      <path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 17h5M17 7h5" />
    </svg>
  );
};

export const Play = ({ width, height, stroke, color, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={fill}
      viewBox="0 0 512 512"
    >
      <path d="M256 0C114.617 0 0 114.615 0 256s114.617 256 256 256 256-114.615 256-256S397.383 0 256 0zm88.48 269.57l-128 80a16.008 16.008 0 01-16.238.422A15.994 15.994 0 01192 336V176c0-5.82 3.156-11.172 8.242-13.992a15.957 15.957 0 0116.238.422l128 80c4.676 2.93 7.52 8.055 7.52 13.57s-2.844 10.641-7.52 13.57z" />
    </svg>
  );
};

//width="20" height="20" color="#000" stroke="2"

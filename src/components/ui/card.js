import React from "react";

export function Card({ children, className }) {
  return (
    <div className={`rounded-lg shadow-md bg-white overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children }) {
  return <div className="mt-2 px-10">{children}</div>;
}

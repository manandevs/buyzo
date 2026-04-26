"use client";
import * as React from "react";

export function useGridColumns() {
  const [cols, setCols] = React.useState(2);

  React.useEffect(() => {
    const updateCols = () => {
      const width = window.innerWidth;
      if (width >= 1280) setCols(6);      // xl
      else if (width >= 1024) setCols(5); // lg
      else if (width >= 768) setCols(8);  // md
      else if (width >= 640) setCols(6);  // sm
      else setCols(4);                   // default
    };

    updateCols(); // Initial check
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  return cols;
}
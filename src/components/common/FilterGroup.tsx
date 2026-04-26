"use client";

import React from "react";
import { Typography } from "@/components/ui/Typography";

interface FilterGroupProps {
  title: string;
  options: string[];
  selectedOptions?: string[]; 
  onChange?: (value: string) => void; 
}

export default function FilterGroup({
  title,
  options,
  selectedOptions = [],
  onChange,
}: FilterGroupProps) {
  if (!options || options.length === 0) return null;

  return (
    <div className="space-y-2">
      <Typography variant="large" weight="semibold">
        {title}
      </Typography>

      <div className="space-y-1.5 pl-2.5 ml-2.5 border-l border-gray-800">
        {options.map((option) => {
          const checked = selectedOptions.includes(option);

          return (
            <label
              key={option}
              className="flex items-center justify-between gap-3 cursor-pointer"
            >
              <Typography variant="small" className="line-clamp-1">
                {option}
              </Typography>

              <input
                type="checkbox"
                checked={checked}
                onChange={() => onChange?.(option)}
              />
            </label>
          );
        })}
      </div>
    </div>
  );
}
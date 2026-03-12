"use client";

import React, { createContext, useContext, useState } from "react";

interface SidebarContextType {
  activeSidebar: string | null;
  openSidebar: (id: string) => void;
  closeSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const[activeSidebar, setActiveSidebar] = useState<string | null>(null);

  return (
    <SidebarContext.Provider
      value={{
        activeSidebar,
        openSidebar: setActiveSidebar,
        closeSidebar: () => setActiveSidebar(null),
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
import React, { createContext, useContext, useState } from 'react';

/**
 * Mobile Menu Context
 *
 * Holds open/closed state for the header's mobile navigation drawer.
 * Wrapped around the app in `_app.tsx` via `MobileMenuProvider`.
 *
 * API exposed by `useMobileMenu()`:
 * - `isOpen` / `setIsOpen` — current state and direct setter.
 * - `toggle()` — flip open/closed (used by the Header hamburger button).
 * - `close()` — always close (used by `NavigationLink` after a tap).
 *
 * Throws if `useMobileMenu()` is called outside the provider.
 */

interface MobileMenuContextType {
  isOpen: boolean;                    // Current menu state
  setIsOpen: (open: boolean) => void; // Direct state setter
  toggle: () => void;                 // Toggle menu open/closed
  close: () => void;                  // Close menu (common action)
}

// Create context with undefined default (requires provider)
const MobileMenuContext = createContext<MobileMenuContextType | undefined>(undefined);

/**
 * useMobileMenu — typed accessor for `MobileMenuContext`.
 *
 * @throws if called outside `MobileMenuProvider`
 */
export const useMobileMenu = () => {
  const context = useContext(MobileMenuContext);
  if (!context) {
    throw new Error('useMobileMenu must be used within a MobileMenuProvider');
  }
  return context;
};

interface MobileMenuProviderProps {
  children: React.ReactNode;
}

/**
 * MobileMenuProvider — mounts `MobileMenuContext` for the app tree.
 * Menu starts closed (`useState(false)`).
 */
export const MobileMenuProvider: React.FC<MobileMenuProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false); // Menu starts closed

  // Helper functions for common menu operations
  const toggle = () => setIsOpen(!isOpen);     // Toggle open/closed state
  const close = () => setIsOpen(false);        // Always close (used by nav links)

  return (
    <MobileMenuContext.Provider value={{ isOpen, setIsOpen, toggle, close }}>
      {children}
    </MobileMenuContext.Provider>
  );
};

import React from 'react';
// Uniform imports for creating footer layout
import { UniformSlot, UniformText, registerUniformComponent } from '@uniformdev/canvas-react';

export interface FooterProps {
  className?: string;
}

/**
 * Footer Component
 *
 * Site footer with two editable areas: a navigation slot and a copyright line.
 * Rendered in the Page component's footer slot.
 *
 * Layout:
 * - Mobile: links centered and stacked above copyright (`flex-col`).
 * - Desktop (`md+`): links left, copyright right (`flex-row justify-between`).
 *
 * Composition:
 * - Links: UniformSlot `footerLinks` — accepts `FooterNavLink` components.
 * - Copyright: UniformText (`copyrightText`).
 */
function Footer({ className = '' }: FooterProps) {
  return (
    <footer className={`bg-gray-50 border-t border-gray-200 ${className}`}>
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          
          {/* FOOTER NAVIGATION: Links to important pages */}
          <nav className="flex flex-wrap items-center justify-center md:justify-start space-x-6">
            {/* UNIFORM SLOT: Content authors can add FooterNavLink components here */}
            <UniformSlot name="footerLinks" />
          </nav>

          {/* COPYRIGHT TEXT: Editable legal/copyright information */}
          <div className="text-sm text-gray-600">
            <UniformText 
              parameterId="copyrightText" 
              placeholder="Copyright text goes here" 
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "footer",
  component: Footer,
});

export default Footer;
import React from 'react';
// Uniform imports for creating footer navigation links
import { UniformText, registerUniformComponent } from '@uniformdev/canvas-react';
import Link from "next/link"; // Next.js optimized navigation

export interface FooterNavLinkProps {
  className?: string;
  link?: {
    path: string; // URL destination
  };
}

/**
 * Footer Navigation Link Component
 *
 * Minimal text link for the footer's `footerLinks` slot. Unlike
 * `NavigationLink` in the header, this has no mobile-menu integration —
 * it is just a muted `next/link` with editable label text.
 *
 * Composition:
 * - Label: UniformText (`parameterId="text"`), rendered as `<span>`.
 * - Destination: `link.path` from Uniform. Falls back to `"#"` when unset.
 * - Styling: `text-sm text-gray-600`, darkens to `gray-900` on hover.
 *   No button chrome — plain text links only.
 */
export const FooterNavLink: React.FC<FooterNavLinkProps> = ({ 
  className = '',
  link
}) => {
  const href = link?.path || "#";
  
  return (
    <Link 
      href={href} 
      className={`block text-gray-600 hover:text-gray-900 text-sm transition-colors duration-300 ${className}`}
    >
      {/* UNIFORM TEXT: Editable link text for footer navigation */}
      <UniformText
        placeholder="Link goes here"
        parameterId="text"
        as="span"
        className="inline"
      />
    </Link>
  );
};

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "footerNavLink",
  component: FooterNavLink,
});

export default FooterNavLink;

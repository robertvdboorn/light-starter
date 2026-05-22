import React from 'react';
// Uniform imports for creating editable components
import { UniformText, registerUniformComponent } from '@uniformdev/canvas-react';
import { Button } from "../ui/button"; // Reusable UI button component
import Link from "next/link"; // Next.js optimized linking

export interface CTAProps {
  className?: string;
  link?: {
    path?: string; // URL destination for the button
  };
  style?: string; // Visual style variant
}

/**
 * CTA (Call-to-Action) Component
 *
 * A linked button intended for `cta` UniformSlots (e.g. inside `Section`,
 * `Card`, `ImageHero`). Authors edit the label inline; the destination
 * comes from the `link` parameter.
 *
 * Composition:
 * - Label: UniformText (`parameterId="text"`), rendered as `<span>` inside
 *   the shadcn `Button` so the button element stays valid HTML.
 * - Destination: `link.path` from Uniform. Falls back to `"#"` when unset
 *   so the component still renders in the editor.
 * - Style: the `style` prop maps to shadcn `Button` variants —
 *   `"primary"` (default) → `variant="default"`, `"secondary"` →
 *   `variant="outline"`.
 * - Navigation: wrapped in `next/link` for client-side routing.
 */
export const CTA: React.FC<CTAProps> = ({ 
  className = '',
  link,
  style = 'primary' // Default to primary button styling
}) => {
  // Use provided link or fallback to placeholder
  const href = link?.path || "#";
  
  return (
    <Link href={href} className={className}>
      <Button
        size="lg"
        variant={style === 'secondary' ? 'outline' : 'default'} // Style based on prop
        className="px-8 py-3"
      >
        {/* UNIFORM TEXT: Editable button text */}
        <UniformText
          placeholder="Button text goes here" // Shown when empty
          parameterId="text" // Content field ID
          as="span" // Render as span inside button
        />
      </Button>
    </Link>
  );
};

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "cta",
  component: CTA,
});

export default CTA;

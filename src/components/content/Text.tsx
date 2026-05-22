import React from "react";
// Uniform imports for simple text editing
import {
  UniformText,
  registerUniformComponent,
} from "@uniformdev/canvas-react";

export interface TextProps {
  className?: string;
}

/**
 * Text Component
 *
 * Standalone plain-text block — a single UniformText field with no
 * formatting toolbar. Same section shell as `RichText` but centered
 * (`text-center`) and rendered at `text-lg`.
 *
 * Composition:
 * - Content: UniformText (`parameterId="content"`), rendered as `<p>`.
 * - Layout: `max-w-4xl` container, centered.
 *
 * For content that needs formatting (bold, links, lists), use `RichText`
 * instead.
 */
export const Text: React.FC<TextProps> = ({
  className = "",
}) => {
  return (
    <section className={`py-12 px-6 ${className}`}>
      {/* Centered container with optimal reading width */}
      <div className="max-w-4xl mx-auto text-center">
        <div className="text-gray-600 leading-relaxed text-lg">
          {/* UNIFORM TEXT: Simple text input without formatting */}
          <UniformText
            placeholder="Simple text content goes here"
            parameterId="content"
            as="p" // Renders as paragraph element
          />
        </div>
      </div>
    </section>
  );
};

// UNIFORM REGISTRATION: Makes this component available for simple text content
registerUniformComponent({
  type: "text",
  component: Text,
});

export default Text;

import React from "react";
// Uniform imports for rich text editing
import {
  UniformRichText,
  registerUniformComponent,
} from "@uniformdev/canvas-react";
import { resolveRichTextRenderer } from "../../lib/richTextRenderers";

export interface RichTextProps {
  className?: string;
}

/**
 * Rich Text Component
 *
 * Standalone rich-text block for long-form content. Authors get the full
 * Uniform rich-text toolbar; output is styled via the custom renderers in
 * `src/lib/richTextRenderers.tsx` (headings, lists, blockquotes, images,
 * and the `---` horizontal-rule shortcut).
 *
 * Composition:
 * - Content: UniformRichText (`parameterId="content"`) with
 *   `resolveRichTextRenderer` wired to the shared renderer map.
 * - Layout: `max-w-4xl` prose container, left-aligned (contrast with
 *   `Text`, which centers its plain-text paragraph).
 *
 * For plain text without formatting, use `Text` instead.
 */
export const RichText: React.FC<RichTextProps> = ({
  className = "",
}) => {
  return (
    <section className={`py-12 px-6 ${className}`}>
      {/* Optimal reading width for text content */}
      <div className="max-w-4xl mx-auto">
        <div className="text-gray-600 leading-relaxed">
          {/* UNIFORM RICH TEXT: Full rich text editor with formatting */}
          <UniformRichText
            placeholder="Rich text content goes here"
            parameterId="content"
            resolveRichTextRenderer={resolveRichTextRenderer} // Handles custom rendering
          />
        </div>
      </div>
    </section>
  );
};

// UNIFORM REGISTRATION: Makes this component available for rich content
registerUniformComponent({
  type: "richText",
  component: RichText,
});

export default RichText;

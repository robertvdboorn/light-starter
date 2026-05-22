import React from "react";
// Uniform imports for creating editable components
import {
  UniformText,
  UniformSlot,
  registerUniformComponent,
} from "@uniformdev/canvas-react";
import { Card as UICard, CardContent } from "../ui/card"; // Reusable UI components

export interface CardProps {
  className?: string;
}

/**
 * Card Component
 *
 * A basic content card that displays a title and body text.
 * Designed to be dropped into the `cards` slot of `CardGrid` (or any other
 * slot that accepts cards).
 *
 * Composition:
 * - Title: UniformText, rendered as `<span>` inside an `<h3>` so authors edit
 *   inline without breaking heading semantics.
 * - Body:  UniformText, rendered as `<p>`. (Use `ImageFeature` if you need
 *   rich-text formatting plus an icon.)
 * - CTA:   UniformSlot named "cta" so authors can drop in a CTA button.
 * - Sizing: `h-full` so cards align to equal heights when placed in a
 *   `CardGrid` row.
 */
export const Card: React.FC<CardProps> = ({
  className = "",
}) => {
  return (
    <UICard className={`h-full ${className}`}> {/* h-full ensures equal height in grids */}
      <CardContent className="p-6">
        {/* CARD TITLE: Editable text field for the card headline */}
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          <UniformText
            placeholder="Card title goes here"
            parameterId="title"
            as="span" // Renders as span inside h3 for proper semantics
          />
        </h3>
        
        {/* CARD CONTENT: Rich text editor for formatted content */}
        <div className="text-gray-600 leading-relaxed mb-6">
          <UniformText
            placeholder="Card content goes here"
            parameterId="content"
            as="p"
          />
        </div>

        {/* CTA SLOT: Area where content authors can add call-to-action buttons */}
        <div className="mt-auto">
          <UniformSlot name="cta" />
        </div>
      </CardContent>
    </UICard>
  );
};

// UNIFORM REGISTRATION: Makes this component available in CardGrid slots
// and other components that allow card-type components
registerUniformComponent({
  type: "card",
  component: Card,
});

export default Card;

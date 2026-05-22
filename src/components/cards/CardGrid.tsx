import React from "react";
// Uniform imports for creating layout components
import {
  UniformText,
  UniformSlot,
  registerUniformComponent,
} from "@uniformdev/canvas-react";

export interface CardGridProps {
  className?: string;
}

/**
 * Card Grid Component - Layout Container for Cards
 *
 * Responsive container that arranges its child cards in a CSS grid.
 *
 * Layout:
 * - Editable grid title (UniformText, rendered inside an `<h2>`)
 * - CSS grid: 1 column on mobile → 2 at `md` (≥768px) → 3 at `lg` (≥1024px)
 * - `gap-6` between cards, `max-w-6xl` container with vertical padding
 *
 * The `cards` UniformSlot accepts any registered card-shaped component —
 * out of the box that means `Card` and `ImageFeature`, but any component
 * registered with `registerUniformComponent` and allowed in the `cards`
 * slot definition will render here. Authors can add as many as they like
 * without developer involvement.
 */
export const CardGrid: React.FC<CardGridProps> = ({
  className = "",
}) => {
  return (
    <section className={`py-16 px-6 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {/* GRID HEADER: Centered title for the entire grid */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <UniformText
              placeholder="Grid title goes here"
              parameterId="title"
              as="span" // Renders as span inside h2
            />
          </h2>
        </div>
        
        {/* RESPONSIVE GRID: Automatically adjusts columns based on screen size */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* UNIFORM SLOT: Content authors can add card components here */}
          {/* Each card will automatically fit into the grid layout */}
          <UniformSlot name="cards" />
        </div>
      </div>
    </section>
  );
};

// UNIFORM REGISTRATION: Makes this layout component available
registerUniformComponent({
  type: "cardGrid",
  component: CardGrid,
});

export default CardGrid;

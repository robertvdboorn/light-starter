import React, { useState, useEffect } from "react";
// Uniform imports for component playground functionality
import { UniformPlayground } from "@uniformdev/canvas-react";
import { RootComponentInstance } from "@uniformdev/canvas";
import "../../components/page/page"; // Import all component registrations
import { ResizablePlaygroundDecorator } from "../../components/playground/resizable-playground-decorators";

export type PlaygroundProps = {
  data?: RootComponentInstance | null; // Optional composition data
};

/**
 * Uniform Component Playground
 *
 * Sandbox page at `/uniform-playground/pattern-playground` for previewing
 * registered components in isolation. Uniform Canvas links here when
 * authors design component patterns.
 *
 * Setup:
 * - Imports `../../components/page/page` to pull in all
 *   `registerUniformComponent` calls.
 * - Wraps `UniformPlayground` with `ResizablePlaygroundDecorator` for
 *   breakpoint preview controls.
 *
 * Client-only render (`isClient` gate) avoids SSR hydration mismatches
 * from browser-only playground APIs.
 */
export const PlaygroundPage = ({ data }: PlaygroundProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Font inheritance: Let the playground use the same fonts as the main app
    // This ensures components look the same in playground as they do live
  }, []);

  // Prevent hydration mismatch by only rendering on client
  // This is important for SSR compatibility
  if (!isClient) {
    return <div>Loading playground...</div>;
  }

  // Default playground mode (no specific composition)
  if (!data) {
    return (
      <UniformPlayground
        decorators={[ResizablePlaygroundDecorator]} // Add responsive preview controls
        contextualEditingDefaultPlaceholder="Placeholder Text" // Default placeholder text
      />
    );
  }

  // Playground with specific composition data
  return <UniformPlayground decorators={[ResizablePlaygroundDecorator]} />;
};

export default PlaygroundPage;

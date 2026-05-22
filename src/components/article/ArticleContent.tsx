import React from "react";
import {
  UniformRichText,
  registerUniformComponent,
} from "@uniformdev/canvas-react";
import { resolveRichTextRenderer } from "../../lib/richTextRenderers";

export interface ArticleContentProps {
  className?: string;
}

/**
 * ArticleContent Component
 *
 * The main body of an article detail page. A single UniformRichText field
 * inside a Tailwind Typography (`prose prose-lg`) container.
 *
 * Composition:
 * - Content: UniformRichText (`parameterId="content"`) with
 *   `resolveRichTextRenderer` from `src/lib/richTextRenderers.tsx`.
 * - Layout: `max-w-4xl` with `prose-lg max-w-none` so nested elements
 *   (headings, images, blockquotes) pick up article-appropriate sizing.
 *
 * Pair with `ArticleHeader` above and `ArticleTags` / `ArticleAuthor` below.
 */
export const ArticleContent: React.FC<ArticleContentProps> = ({
  className = "",
}) => {
  return (
    <div className={`max-w-4xl mx-auto px-4 py-8 ${className}`}>
      <div className="prose prose-lg max-w-none">
        <UniformRichText 
          parameterId="content" 
          placeholder="Article content goes here..."
          resolveRichTextRenderer={resolveRichTextRenderer}
        />
      </div>
    </div>
  );
};

// Register with Uniform
registerUniformComponent({
  type: "articleContent",
  component: ArticleContent,
});

export default ArticleContent;

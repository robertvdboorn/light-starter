import React from "react";
import { UniformText, registerUniformComponent } from "@uniformdev/canvas-react";
import { Badge } from "../ui/badge";
import { Tag } from "lucide-react";

export interface ArticleTagsProps {
  className?: string;
  tags?: string[];
  tagsLabel?: string;
}

/**
 * ArticleTags Component
 *
 * Renders article tags as outline badges. Returns `null` when the `tags`
 * array is empty so the section doesn't leave a gap on untagged articles.
 *
 * Composition:
 * - Label: UniformText (`tagsLabel`), defaults to "Tags:".
 * - Tags: `tags` multi-select parameter mapped to shadcn `Badge` components
 *   (`variant="outline"`, `text-xs`), laid out in a wrapping flex row.
 */
export const ArticleTags: React.FC<ArticleTagsProps> = ({
  className = "",
  tags = [],
}) => {
  // Don't render if no tags
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className={`max-w-4xl mx-auto px-4 py-6 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <Tag className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">
          <UniformText
            parameterId="tagsLabel"
            placeholder="Tags:"
          />
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="outline" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
};

// Register with Uniform
registerUniformComponent({
  type: "articleTags",
  component: ArticleTags,
});

export default ArticleTags;

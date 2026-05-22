import React from "react";
// Uniform imports for creating image-based feature cards
import {
  UniformText,
  UniformSlot,
  registerUniformComponent,
} from "@uniformdev/canvas-react";
import { Card, CardContent } from "../ui/card"; // Consistent card styling
import Image from "next/image"; // Next.js optimized images
import { imageFrom } from "@uniformdev/assets"; // Uniform asset processing
import type { AssetParamValue } from "@uniformdev/assets";

export interface ImageFeatureProps {
  className?: string;
  image?: AssetParamValue; // Uniform asset parameter
}

/**
 * Image Feature Component - Card with an Icon-Sized Image
 *
 * A card variant intended for `CardGrid`: a small 96×96 icon image at the
 * top, then title, description, and a CTA slot — all centered.
 *
 * Composition:
 * - Icon: rendered in a 96×96 rounded container via `next/image fill`,
 *   but transformed at 600×400 source so it stays crisp on retina
 *   displays even though it displays small.
 * - Title: UniformText, `<span>` inside an `<h3>`.
 * - Description: UniformText, `<p>`.
 * - CTA: UniformSlot named "cta".
 * - Card shell: shadcn `Card` with `h-full` so it aligns to siblings in
 *   a `CardGrid` row.
 *
 * Placeholder behavior: when no asset is selected, a gray rounded tile
 * with a picture-frame SVG icon is rendered in place of the image, so the
 * layout stays stable in the Uniform editor.
 *
 * Pair this with `Card` (text-only) inside the same `CardGrid` — authors
 * can mix and match.
 */
export const ImageFeature: React.FC<ImageFeatureProps> = ({
  className = "",
  image,
}) => {
  // Process the Uniform asset parameter
  const imageAssets = image ?? [];
  const [firstAsset] = imageAssets;
  
  // Generate optimized image URL for small icon display
  const imageUrl = firstAsset
    ? imageFrom(firstAsset)
        .transform({ 
          width: 600,    // Higher resolution for crisp display
          height: 400,   // Maintain aspect ratio
          fit: "cover",   // Smart crop
          focal: firstAsset.fields?.focalPoint?.value || "center" // Focal point support for precise positioning
        })
        .url()
    : undefined;

  // Extract alt text for accessibility
  const imageAlt = firstAsset?.fields?.description?.value || 
                  firstAsset?.fields?.title?.value || 
                  'Feature image';

  return (
    <Card className={`h-full ${className}`}> {/* h-full for equal height in grids */}
      <CardContent className="p-6 text-center">
        {/* FEATURE IMAGE/ICON: Small centered image */}
        <div className="mb-6">
          {imageUrl ? (
            // ACTUAL IMAGE: Optimized and properly sized
            <div className="relative w-24 h-24 mx-auto overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="96px" // Exact size for optimization
              />
            </div>
          ) : (
            // PLACEHOLDER: Shown when no image is selected
            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        {/* FEATURE TITLE: Editable headline */}
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          <UniformText
            placeholder="Feature title goes here"
            parameterId="title"
            as="span"
          />
        </h3>

        {/* FEATURE DESCRIPTION: Rich text content */}
        <div className="text-gray-600 leading-relaxed mb-6">
          <UniformText
            placeholder="Feature description goes here"
            parameterId="description"
            as="p"
          />
        </div>

        {/* CTA SLOT: Area where content authors can add call-to-action buttons */}
        <div className="mt-auto">
          <UniformSlot name="cta" />
        </div>
      </CardContent>
    </Card>
  );
};

// UNIFORM REGISTRATION: Makes this component available in card slots
registerUniformComponent({
  type: "imageFeature",
  component: ImageFeature,
});

export default ImageFeature;

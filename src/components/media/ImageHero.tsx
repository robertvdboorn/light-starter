import React from "react";
// Uniform imports for creating hero components with background images
import {
  UniformText,
  UniformRichText,
  UniformSlot,
  registerUniformComponent,
} from "@uniformdev/canvas-react";
import { imageFrom } from "@uniformdev/assets"; // Uniform asset processing
import type { AssetParamValue } from "@uniformdev/assets";

export interface ImageHeroProps {
  className?: string;
  backgroundImage?: AssetParamValue; // Uniform background image asset
}

/**
 * Image Hero Component - Hero Section with Background Image
 *
 * A full-bleed hero `<section>` that uses a Uniform asset as a CSS
 * `background-image`, with the title, description, and CTA centered on top.
 *
 * What this component does:
 * - Transforms the asset to 1920×1080 (`cover`, focal-point aware) and
 *   sets it as the section's CSS `background-image` — note this is *not*
 *   `next/image`, because the image is decorative and we want CSS
 *   background sizing/positioning, not a foreground element.
 * - Layers a 40% black overlay (`bg-black/40`) over the image so light
 *   text remains legible against any photo.
 * - Falls back to a gray-900→gray-700 gradient (plus a small corner hint
 *   for editors) when no asset is selected.
 * - Centers an editable title (UniformText, rendered as `<h1>`),
 *   rich-text description, and a `cta` slot on top.
 *
 * Tradeoff: because the image is a CSS background, it isn't optimized
 * through `next/image`. If you need responsive `srcset`/AVIF/blur
 * placeholders, swap the background-image approach for a `next/image fill`
 * inside an absolutely-positioned wrapper.
 */
export const ImageHero: React.FC<ImageHeroProps> = ({ 
  className = "", 
  backgroundImage 
}) => {
  // Process the Uniform background image asset
  const imageAssets = backgroundImage ?? [];
  const [firstAsset] = imageAssets;
  
  // Generate optimized background image URL with high resolution
  const imageUrl = firstAsset
    ? imageFrom(firstAsset)
        .transform({ 
          width: 1920,     // High resolution for quality
          height: 1080,    // 16:9 aspect ratio
          fit: "cover",     // Smart crop to maintain aspect ratio
          focal: firstAsset.fields?.focalPoint?.value || "center" // Focal point support for precise positioning
        })
        .url()
    : undefined;

  return (
    <section 
      className={`relative py-32 px-6 text-center text-white overflow-hidden ${className}`}
      style={{
        backgroundImage: imageUrl ? `url('${imageUrl}')` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Fallback background if no image */}
      {!imageUrl && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-700" />
      )}

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          <UniformText
            placeholder="Hero title goes here"
            parameterId="title"
            as="span"
          />
        </h1>
        
        <div className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
          <UniformRichText
            placeholder="Hero description goes here"
            parameterId="description"
          />
        </div>
        
        {/* CTA Slot */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <UniformSlot name="cta" />
        </div>
      </div>

      {/* Placeholder for when no background image */}
      {!imageUrl && (
        <div className="absolute bottom-4 right-4 z-20 text-white/60 text-sm">
          Select background image in panel →
        </div>
      )}
    </section>
  );
};

// UNIFORM REGISTRATION: Makes this component available for hero sections
registerUniformComponent({
  type: "imageHero",
  component: ImageHero,
});

export default ImageHero;

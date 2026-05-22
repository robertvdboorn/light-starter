import React from "react";
// Uniform imports for video content components
import {
  UniformText,
  UniformRichText,
  registerUniformComponent,
} from "@uniformdev/canvas-react";
import { Play } from "lucide-react"; // Play icon for placeholder
import type { AssetParamValue } from "@uniformdev/assets";
import { resolveRichTextRenderer } from "@/lib/richTextRenderers";

export interface VideoProps {
  className?: string;
  video?: AssetParamValue; // Uniform video asset parameter
}

/**
 * Video Component - Video Content Display
 *
 * Renders a video from a Uniform asset inside a 16:9 frame, with an
 * editable title and rich-text description above.
 *
 * What this component does:
 * - Reads the video URL directly from the asset's `fields.url.value`.
 *   Unlike images, videos are *not* piped through `imageFrom().transform()`
 *   — Uniform serves the original file and the browser handles playback.
 * - Renders a native `<video controls>` element so we get the platform's
 *   built-in player (PiP, fullscreen, keyboard a11y) for free.
 * - Declares both MP4 and WebM `<source>` tags pointing at the same URL,
 *   so the browser can pick whichever it supports. (If you upload only
 *   one format, the unsupported `<source>` is just ignored.)
 * - Uses `preload="metadata"` so the page loads the duration/poster
 *   frame without downloading the full file.
 * - Shows a centered Play-icon placeholder card when no asset is selected,
 *   keeping the 16:9 box reserved so the layout doesn't jump in the editor.
 */
export const Video: React.FC<VideoProps> = ({
  className = "",
  video,
}) => {
  // Process the Uniform video asset parameter
  const videoAssets = video ?? [];
  const [firstVideo] = videoAssets;
  
  // Extract video URL from asset metadata
  const videoUrl = firstVideo?.fields?.url?.value;

  return (
    <section className={`py-16 px-6 ${className}`}>
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <UniformText
              placeholder="Video title goes here"
              parameterId="title"
              as="span"
            />
          </h2>
          <div className="text-lg text-gray-600 max-w-2xl mx-auto">
            <UniformRichText
              placeholder="Video description goes here"
              parameterId="description"
              resolveRichTextRenderer={resolveRichTextRenderer}
            />
          </div>
        </div>

        {/* Video Player or Placeholder */}
        <div className="aspect-video overflow-hidden rounded-lg shadow-lg bg-gray-100">
          {videoUrl ? (
            <video
              controls
              className="w-full h-full"
              preload="metadata"
            >
              <source src={videoUrl} type="video/mp4" />
              <source src={videoUrl} type="video/webm" />
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <Play className="h-16 w-16 text-gray-400 mb-4" />
                <p className="text-gray-600">Your browser does not support the video tag.</p>
              </div>
            </video>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-center p-8">
              <div className="w-20 h-20 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
                <Play className="h-8 w-8 text-gray-400" />
              </div>
              <h4 className="text-xl font-semibold text-gray-700 mb-2">
                No Video Selected
              </h4>
              <p className="text-gray-500 text-sm">
                Select a video in the panel →
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

registerUniformComponent({
  type: "video",
  component: Video,
});

export default Video;

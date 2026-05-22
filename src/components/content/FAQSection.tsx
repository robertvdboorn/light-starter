import React, { useState, useEffect } from "react";
import {
  UniformText,
  UniformSlot,
  registerUniformComponent,
  useUniformContextualEditingState,
  type ComponentProps,
} from "@uniformdev/canvas-react";
import type { ComponentInstance } from "@uniformdev/canvas";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";

export interface FAQSectionProps {
  className?: string;
}

function isSelectedChild(
  selectedId: string | undefined,
  item: ComponentInstance
): boolean {
  if (!selectedId) return false;
  const itemId = item._id;
  return (
    itemId === selectedId ||
    itemId?.includes(selectedId) ||
    selectedId.includes(itemId ?? "")
  );
}

/** Direct faqItem slots, or faqItems nested inside a `$loop` body slot. */
function getFaqItemsFromSlot(
  items: ComponentInstance[] | undefined
): ComponentInstance[] {
  if (!items?.length) return [];

  return items.flatMap((item) => {
    if (item.type === "$loop") {
      return (item.slots?.body as ComponentInstance[] | undefined) ?? [];
    }
    return [item];
  });
}

/**
 * FAQSection — two-column FAQ block with a controlled Radix accordion.
 *
 * Layout:
 * - Left:  heading + description (UniformText).
 * - Right: `items` slot inside `AccordionPrimitive.Root` — accepts `faqItem`
 *   components directly, or a `$loop` that renders `faqItem` rows from FAQ
 *   content entries (see `FAQ Section Pattern` in uniform-data).
 * - Mobile: single column; desktop (`lg+`): side-by-side grid.
 *
 * Canvas editing:
 * - Accordion open state is controlled (`expandedItem` + `onValueChange`).
 * - `useUniformContextualEditingState({ global: true })` watches the
 *   selected component in the editor; when a child `faqItem` is selected,
 *   its `_id` is set as `expandedItem` so authors can edit the answer
 *   without manually opening the row first.
 */
export const FAQSection: React.FC<ComponentProps<FAQSectionProps>> = ({
  component,
  className = "",
}) => {
  const [expandedItem, setExpandedItem] = useState("");
  const { selectedComponentReference } = useUniformContextualEditingState({
    global: true,
  });

  useEffect(() => {
    const selectedId = selectedComponentReference?.id;
    const childItems = getFaqItemsFromSlot(
      component?.slots?.items as ComponentInstance[] | undefined
    );

    if (!selectedId || !childItems?.length) return;

    const selectedChild = childItems.find((item) =>
      isSelectedChild(selectedId, item)
    );

    if (selectedChild?._id) {
      setExpandedItem(selectedChild._id);
    }
  }, [selectedComponentReference, component]);

  return (
    <section className={cn("relative z-10 py-24 px-6 bg-muted/20", className)}>
      <div className="max-w-7xl mx-auto">
        <div className="rounded-3xl bg-card ring-1 ring-border p-12 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-balance text-foreground">
                <UniformText
                  parameterId="heading"
                  placeholder="FAQ section heading"
                  as="span"
                />
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
                <UniformText
                  parameterId="description"
                  placeholder="Section description"
                  as="span"
                />
              </p>
            </div>

            <div className="space-y-4">
              <AccordionPrimitive.Root
                type="single"
                collapsible
                value={expandedItem}
                onValueChange={setExpandedItem}
              >
                <UniformSlot name="items" />
              </AccordionPrimitive.Root>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

registerUniformComponent({
  type: "faqSection",
  component: FAQSection,
});

export default FAQSection;

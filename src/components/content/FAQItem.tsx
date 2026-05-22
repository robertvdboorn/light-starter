import React, { useId } from "react";
import {
  UniformText,
  registerUniformComponent,
  type ComponentProps,
} from "@uniformdev/canvas-react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FAQItemProps {
  className?: string;
}

/**
 * FAQItem — single accordion row for the `items` slot on `FAQSection`.
 *
 * Composition:
 * - Question: UniformText (`parameterId="question"`), `<span>` inside `<h3>`.
 * - Answer:   UniformText (`parameterId="answer"`), `<span>` inside `<p>`.
 * - Value:    `component._id` drives Radix accordion state — must stay
 *   stable and unique within the parent `FAQSection`.
 *
 * Must be placed in the `items` slot of `FAQSection`, which wraps the slot
 * in `AccordionPrimitive.Root` — Radix requires `Item` to be a descendant
 * of `Root` for open/close state to work.
 */
export const FAQItem: React.FC<ComponentProps<FAQItemProps>> = ({
  component,
  className = "",
}) => {
  const fallbackId = useId();
  const itemValue = component?._id ?? fallbackId;

  return (
    <AccordionPrimitive.Item
      value={itemValue}
      className={cn(
        "rounded-2xl bg-accent/30 ring-1 ring-border overflow-hidden shadow-sm mb-4 last:mb-0",
        className
      )}
    >
      <AccordionPrimitive.Header>
        <AccordionPrimitive.Trigger className="w-full p-6 text-left flex items-center justify-between hover:bg-accent/50 transition-colors group">
          <h3 className="text-lg font-semibold pr-4 text-foreground">
            <UniformText
              parameterId="question"
              placeholder="FAQ question"
              as="span"
            />
          </h3>
          <span className="shrink-0 text-primary">
            <Plus className="w-5 h-5 group-data-[state=open]:hidden" />
            <Minus className="w-5 h-5 group-data-[state=closed]:hidden" />
          </span>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>

      <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
        <div className="px-6 pb-6">
          <p className="text-muted-foreground leading-relaxed">
            <UniformText
              parameterId="answer"
              placeholder="FAQ answer"
              as="span"
            />
          </p>
        </div>
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  );
};

registerUniformComponent({
  type: "faqItem",
  component: FAQItem,
});

export default FAQItem;

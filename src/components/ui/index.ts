/**
 * Base UI primitives (shadcn/ui)
 *
 * The files in this folder are unmodified (or lightly tweaked) shadcn/ui
 * components — copy-in primitives built on Radix UI and styled with Tailwind.
 * They are intentionally uncommented to stay close to the upstream source so
 * future shadcn updates can be diffed and pulled in cleanly.
 *
 * Project-specific components in `src/components/{content,cards,media,...}`
 * compose these primitives and add the Uniform integration + comments.
 *
 * See `button.tsx` for the canonical `cva` variant pattern used across the
 * primitives, and `card.tsx` for the slot composition pattern (Card,
 * CardHeader, CardContent, etc.).
 *
 * Reference: https://ui.shadcn.com
 */

export { Alert, AlertTitle, AlertDescription } from './alert';
export { Badge, badgeVariants } from './badge';
export { Button, buttonVariants } from './button';
export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent } from './card';
export { 
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from './dropdown-menu';
export { Input } from './input';
export { Label } from './label';
export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './select';
export { Separator } from './separator';

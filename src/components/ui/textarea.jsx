import * as React from "react"
import { Label } from "./label"
import { cn } from "../../lib/utils"

function Textarea({ className, label, id, errors, ...props }) {
  return (
        <div className="space-y-2">
            {label && <Label htmlFor={id}>{label}</Label>}
            <textarea
            data-slot="textarea"
            className={cn(
                "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input min-h-[120px] w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                className
            )}
            {...props}
            />
            {errors && (
                <p className="text-destructive mt-1 text-sm">
                {errors?.message || errors}
                </p>
            )}
        </div>
  )
}

export { Textarea }
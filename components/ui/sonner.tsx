"use client"
import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-5 rounded-lg stroke-green-700 dark:bg-green-400" />,
        info: <InfoIcon className="size-5 rounded-lg stroke-primary-foreground bg-brand-color" />,
        warning: <TriangleAlertIcon className="size-5 rounded stroke-orange-700 dark:bg-orange-400" />,
        error: <OctagonXIcon className="size-5 rounded-lg stroke-red-700 dark:bg-red-400" />,
        loading: <Loader2Icon className="size-5 rounded-lg stroke-brand-color animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }

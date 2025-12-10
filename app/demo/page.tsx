import ThemeToggle from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { ClipboardCheck } from "lucide-react"

export default function Demo() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-6 py-12">
      <header className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            Component demo surface
          </p>
          <h1 className="font-mono text-4xl font-bold">UI Toolkit Preview</h1>
        </div>
        <ThemeToggle />
      </header>

      <section className="space-y-4 rounded-xl border bg-card/40 p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase text-muted-foreground">
          Typography
        </p>
        <div className="space-y-2">
          <h1 className="font-mono text-4xl font-bold">Heading One (h1)</h1>
          <h2 className="font-mono text-3xl font-bold">Heading Two (h2)</h2>
          <h3 className="font-mono text-2xl font-semibold">
            Heading Three (h3)
          </h3>
          <h4 className="font-mono text-xl font-semibold">
            Heading Four (h4)
          </h4>
          <p className="font-sans text-base text-muted-foreground">
            Paragraph body copy showing the default text styling. Keep content
            concise and readable across breakpoints.
          </p>
        </div>
      </section>

      <section className="space-y-6 rounded-xl border bg-card/40 p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase text-muted-foreground">
          Button variants
        </p>
        <div className="flex flex-wrap gap-3">
          <Button variant="default">Default</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>

        <p className="text-sm font-semibold uppercase text-muted-foreground">
          Button sizes
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm" variant="secondary">
            Small
          </Button>
          <Button size="default" variant="secondary">
            Default
          </Button>
          <Button size="lg" variant="secondary">
            Large
          </Button>
          <Button size="icon" aria-label="icon button" variant="secondary">
            <ClipboardCheck />
          </Button>
          <Button size="icon-sm" aria-label="icon button small" variant="secondary">
            <ClipboardCheck />
          </Button>
          <Button size="icon-lg" aria-label="icon button large" variant="secondary">
            <ClipboardCheck />
          </Button>
        </div>
      </section>
    </div>
  )
}

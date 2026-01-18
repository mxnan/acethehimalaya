import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { ClipboardCheck } from "lucide-react";
import Accordion from "@/components/mdx/accordion";

export default function Demo() {
  const accordionItems = [
    {
      title: "Day 1: Arrival in Kathmandu",
      content: (
        <div className="space-y-2">
          <p>Arrive at Tribhuvan International Airport and transfer to your hotel in Thamel. Free afternoon to explore the vibrant streets of Kathmandu. Evening welcome dinner with the trekking team.</p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>Accommodation: 3-star hotel</li>
            <li>Meals: Welcome dinner</li>
            <li>Altitude: 1,400m/4,593ft</li>
          </ul>
        </div>
      ),
    },
    {
      title: "Day 2: Fly to Lukla and trek to Phakding",
      content: (
        <div className="space-y-2">
          <p>Early morning scenic flight to Lukla (35 minutes), then begin your trek along the Dudh Koshi River valley to Phakding. This gentle walk helps you acclimate to the altitude.</p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>Flight: Kathmandu to Lukla (35 min)</li>
            <li>Trek: 3-4 hours, 8km</li>
            <li>Altitude: 2,610m/8,563ft</li>
            <li>Meals: Breakfast, Lunch, Dinner</li>
          </ul>
        </div>
      ),
    },
    {
      title: "Day 3: Trek to Namche Bazaar",
      content: (
        <div className="space-y-2">
          <p>Continue trekking through beautiful forests and terraced fields to Namche Bazaar, the gateway to Everest region. Enjoy your first views of Mt. Everest and surrounding peaks.</p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>Trek: 5-6 hours, 11km</li>
            <li>Altitude: 3,440m/11,286ft</li>
            <li>Highlights: First Everest views, Sherpa culture</li>
            <li>Accommodation: Guesthouse with attached bathroom</li>
          </ul>
        </div>
      ),
    },
    {
      title: "Day 4: Acclimatization day in Namche",
      content: (
        <div className="space-y-2">
          <p>Rest and acclimatization day in Namche Bazaar. Short hike to Hotel Everest View for panoramic mountain views, visit local monasteries and markets.</p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>Hike: 4-5 hours to Hotel Everest View (3,880m)</li>
            <li>Activities: Visit Tengboche Monastery (optional)</li>
            <li>Free time: Explore Namche markets</li>
            <li>Accommodation: Same guesthouse</li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-6 py-12">
      <header className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            Component demo surface
          </p>
          <h1 className="font-sans text-4xl font-bold">UI Toolkit Preview</h1>
        </div>
        <ThemeToggle />
      </header>

      <section className="space-y-4 rounded-xl border bg-card/40 p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase text-muted-foreground">
          Typography
        </p>
        <div className="space-y-2">
          <h1 className="font-sans text-4xl font-bold">Heading One (h1)</h1>
          <h2 className="font-sans text-3xl font-bold">Heading Two (h2)</h2>
          <h3 className="font-sans text-2xl font-semibold">
            Heading Three (h3)
          </h3>
          <h4 className="font-sans text-xl font-semibold">Heading Four (h4)</h4>
          <p className="font-sans text-base text-muted-foreground">
            Paragraph body copy showing the default text styling. Keep content
            concise and readable across breakpoints.
          </p>
        </div>
      </section>

      <section className="space-y-6 rounded-xl border bg-card/40 p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase text-muted-foreground">
          Accordion Component
        </p>
        <div className="max-w-2xl">
          <Accordion items={accordionItems} />
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
          <Button size="sm" variant="default">
            Small
          </Button>
          <Button size="default" variant="default">
            Default
          </Button>
          <Button size="lg" variant="default">
            Large
          </Button>
          <Button
            size="icon-sm"
            aria-label="icon button small"
            variant="default"
          >
            <ClipboardCheck />
          </Button>
          <Button size="icon" aria-label="icon button" variant="default">
            <ClipboardCheck />
          </Button>
          <Button
            size="icon-lg"
            aria-label="icon button large"
            variant="default"
          >
            <ClipboardCheck />
          </Button>
        </div>
      </section>
    </div>
  );
}
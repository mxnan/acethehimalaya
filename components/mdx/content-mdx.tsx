import * as runtime from "react/jsx-runtime";
import { BaseComponents } from "./base-mdx"; // import for base components
import { Button } from "../ui/button";
import MDXErrorBoundary from "./error-boundary";
import Image from "next/image";
import { Callout, CalloutFooter } from "./callout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import dynamic from "next/dynamic";

// Dynamic imports for heavy components using Next.js dynamic
const YTEmbed = dynamic(() => import("./yt-embed").then((mod) => mod.default));
const TripDetailsCard = dynamic(() =>
  import("../cards/trip-details-card").then((mod) => mod.TripDetailsCard)
);
const TripAltitudeChart = dynamic(() =>
  import("./trip-altitude-chart").then((mod) => mod.TripAltitudeChart)
);
const GoogleReviewsSection = dynamic(() =>
  import("../reviews/google-reviews-section").then(
    (mod) => mod.GoogleReviewsSection
  )
);
const TripadvisorReviewsSection = dynamic(() =>
  import("../reviews/tripadvisor-reviews-section").then(
    (mod) => mod.TripadvisorReviewsSection
  )
);
const TrekMap = dynamic(() => import("./trek-map").then((mod) => mod.TrekMap));
const CalendarCard = dynamic(() =>
  import("./calendar-card").then((mod) => mod.default)
);
const PrivateTripForm = dynamic(() =>
  import("./private-trip-form").then((mod) => mod.PrivateTripForm)
);

////////////////////////////////
const sharedComponents = {
  // Add your base components here
  ...BaseComponents,
  Button,
  Image,
  // Add your custom components here
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Callout,
  CalloutFooter,
  Accordion: dynamic(() => import("./accordion").then((mod) => mod.Accordion)),
  AccordionItem: dynamic(() =>
    import("./accordion").then((mod) => mod.AccordionItem)
  ),
  AccordionTrigger: dynamic(() =>
    import("./accordion").then((mod) => mod.AccordionTrigger)
  ),
  AccordionContent: dynamic(() =>
    import("./accordion").then((mod) => mod.AccordionContent)
  ),
  TrekMap,
  TripDetailsCard,
  TripAltitudeChart,
  CalendarCard,
  PrivateTripForm,
  YTEmbed,
  GoogleReviewsSection,
  TripadvisorReviewsSection,
};

// parse the Velite generated MDX code into a React component function
const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

interface MDXProps {
  code: string;
}

// MDXContent component
export const MDXContent = ({ code }: MDXProps) => {
  const Component = useMDXComponent(code);
  return (
    <MDXErrorBoundary>
      <section className="w-full h-full relative">
        <Component components={sharedComponents} />
      </section>
    </MDXErrorBoundary>
  );
};

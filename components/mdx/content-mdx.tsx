import * as runtime from "react/jsx-runtime";
import dynamic from "next/dynamic";
import Image from "next/image";
import { BaseComponents } from "./base-mdx"; // import for base components
import MDXErrorBoundary from "./error-boundary";
import { Button } from "../ui/button";
import { Callout, CalloutFooter } from "./callout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

// ----------------------- Core MDX components (always) -----------------------
// These are light, generic components that can be safely available on all MDX pages.
const YTEmbed = dynamic(() => import("./yt-embed").then((mod) => mod.default));

// ---------------------------- Trip-specific components ----------------------------
// These should only be available on trip MDX pages (/trips/*).
const TripDetailsCard = dynamic(
  () => import("../cards/trip-details-card").then((mod) => mod.TripDetailsCard),
  { ssr: true }
);
// Lazy-loaded with intersection observer (below-the-fold)
const TripAltitudeChart = dynamic(
  () =>
    import("./trip-altitude-chart-lazy").then(
      (mod) => mod.TripAltitudeChartLazy
    ),
  { ssr: true }
);
// Lazy-loaded with intersection observer (below-the-fold)
const TrekMap = dynamic(
  () => import("./trek-map-lazy").then((mod) => mod.TrekMapLazy),
  { ssr: true }
);
const TripCalendar = dynamic(
  () => import("./trip-calendar").then((mod) => mod.TripCalendar),
  { ssr: true }
);
const PrivateTripForm = dynamic(
  () => import("./private-trip-form").then((mod) => mod.PrivateTripForm),
  { ssr: true }
);

// ---------------------- Component maps by responsibility ---------------------

// Core components shared across all MDX routes (blogs, generic pages)
const coreComponents = {
  ...BaseComponents,
  Button,
  Image,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Callout,
  CalloutFooter,
  // Generic media
  YTEmbed,
};

const countryComponents = {

}

// Trip-specific components: only used on /trips/* MDX content
const tripComponents = {
  TrekMap,
  TripDetailsCard,
  TripAltitudeChart,
  TripCalendar,
  PrivateTripForm,
  // Interactive but generic: accordions are used broadly
  Accordion: dynamic(() => import("./accordion").then((mod) => mod.Accordion), {
    ssr: true,
  }),
  AccordionItem: dynamic(
    () => import("./accordion").then((mod) => mod.AccordionItem),
    { ssr: true }
  ),
  AccordionTrigger: dynamic(
    () => import("./accordion").then((mod) => mod.AccordionTrigger),
    { ssr: true }
  ),
  AccordionContent: dynamic(
    () => import("./accordion").then((mod) => mod.AccordionContent),
    { ssr: true }
  ),
};

// Component map for blog / generic MDX pages (no trip-specific components)
const blogComponents = {
  ...coreComponents,
};

const countryPageComponents = {
  ...coreComponents,
  ...countryComponents,
};
// Component map for trip MDX pages (core + trip-specific)
const tripPageComponents = {
  ...coreComponents,
  ...tripComponents,
};
// parse the Velite generated MDX code into a React component function
const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

interface MDXProps {
  code: string;
}

// Blog / generic MDXContent component (used for /blogs/* etc.)
export const MDXContent = ({ code }: MDXProps) => {
  const Component = useMDXComponent(code);
  return (
    <MDXErrorBoundary>
      <section className="w-full h-full relative">
        <Component components={blogComponents} />
      </section>
    </MDXErrorBoundary>
  );
};

// Country-specific MDXContent component (used for /countries/*)
export const CountryMDXContent = ({ code }: MDXProps) => {
  const Component = useMDXComponent(code);
  return (
    <MDXErrorBoundary>
      <section className="w-full h-full relative">
        <Component components={countryPageComponents} />
      </section>
    </MDXErrorBoundary >
  );
};

// Trip-specific MDXContent component (used for /trips/*)
export const TripMDXContent = ({ code }: MDXProps) => {
  const Component = useMDXComponent(code);
  return (
    <MDXErrorBoundary>
      <section className="w-full h-full relative">
        <Component components={tripPageComponents} />
      </section>
    </MDXErrorBoundary>
  );
};

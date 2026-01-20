import * as runtime from "react/jsx-runtime";
import { BaseComponents } from "./base-mdx"; // import for base components
import { Button } from "../ui/button";
import MDXErrorBoundary from "./error-boundary";
import YTEmbed from "./yt-embed";
import Image from "next/image";
import { TripDetailsCard } from "../cards/trip-details-card";
import { Callout, CalloutFooter } from "./callout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";
import { TripAltitudeChart } from "./trip-altitude-chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import CalendarCard from "./calendar-card";
import { PrivateTripForm } from "./private-trip-form";
import { GoogleReviewsSection } from "../reviews/google-reviews-section";
import { TripadvisorReviewsSection } from "../reviews/tripadvisor-reviews-section";
import { TrekMap } from "./trek-map";


////////////////////////////////
const sharedComponents = {
  // Add your base components here
  ...BaseComponents,
  Button,
  Image,
  // Add your custom components here
  YTEmbed,
  TrekMap, 
  TripDetailsCard,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Callout,
  CalloutFooter,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  TripAltitudeChart,
  CalendarCard,
  PrivateTripForm,
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

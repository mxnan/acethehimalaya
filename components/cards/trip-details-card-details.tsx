import { cn } from "@/lib/utils";
import {
  MapPin,
  Clock,
  Mountain,
  Activity,
  TrendingUp,
  Calendar,
  Home,
  Utensils,
  Route,
  Map,
} from "lucide-react";

type DetailKey =
  | "country"
  | "duration"
  | "difficulty"
  | "activity"
  | "altitude"
  | "bestSeason"
  | "accommodation"
  | "meals"
  | "startEnd"
  | "trekkingDistance";

export type TripDetailsEntries = [DetailKey, string][];

export const detailLabels: Record<DetailKey, string> = {
  country: "Country",
  duration: "Duration",
  difficulty: "Difficulty",
  activity: "Activity",
  altitude: "Max Altitude",
  bestSeason: "Best Season",
  accommodation: "Accommodation",
  meals: "Meals",
  startEnd: "Start / End Point",
  trekkingDistance: "Trekking Distance",
};

const detailIcons: Record<
  DetailKey,
  React.ComponentType<{ className?: string }>
> = {
  country: MapPin,
  duration: Clock,
  difficulty: Mountain,
  activity: Activity,
  altitude: TrendingUp,
  bestSeason: Calendar,
  accommodation: Home,
  meals: Utensils,
  startEnd: Route,
  trekkingDistance: Map,
};

interface TripDetailsPanelProps {
  entries: TripDetailsEntries;
  variant?: "default" | "info-only";
  className?: string;
}

/**
 * Server-safe presentational component for the trip details grid.
 * No hooks or client-only APIs – can be rendered on the server.
 */
export function TripDetailsPanel({
  entries,
  variant = "default",
  className,
}: TripDetailsPanelProps) {
  if (!entries.length) return null;

  return (
    <div
      className={cn(
        "rounded-lg p-4",
        variant === "info-only"
          ? "w-full bg-muted text-primary"
          : "w-max bg-black/50 backdrop-blur-md text-white",
        className
      )}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {entries.map(([key, value]) => {
          const Icon = detailIcons[key];

          return (
            <div key={key} className="flex items-start gap-3">
              <div className="flex p-2 items-center justify-center rounded-md bg-neutral-600 dark:bg-neutral-100">
                <Icon
                  className={cn("size-5 stroke-3", "stroke-primary-foreground")}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs ">{detailLabels[key]}</span>
                <span className="text-sm font-semibold ">{value}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

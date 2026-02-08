import { trips } from "#site/content";
import { CATEGORIES } from "./categories";

export type CategoryStat = {
  key: string;
  label: string;
  image: string;
  count: number;
};

export function getCategoryStats(): CategoryStat[] {
  const countMap = trips.reduce<Record<string, number>>((acc, trip) => {
    const key = trip.category
    // console.log(key)
    if (!key) return acc;

    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

  return CATEGORIES.map((category) => ({
    ...category,
    count: countMap[category.key] ?? 0,
  }));
}

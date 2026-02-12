import { trips } from "#site/content";
import { TREKKING_REGIONS_NEPAL } from "./trekking-regions";


export type TrekkingRegionStat = {
  key: string;
  label: string;
  image: string;
  count: number;
};


export function getTrekkingRegionStatsNepal(): TrekkingRegionStat[] {
  const countMap = trips.reduce<Record<string, number>>((acc, trip) => {
    if (
      trip.country?.toLowerCase() !== "nepal" ||
      (trip.category !== "Trekking" &&
       trip.category !== "Climbing and Expedition")
    ) {
      return acc;
    }

    const key = trip.region;
    if (!key) return acc;

    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

  return TREKKING_REGIONS_NEPAL.map((region) => ({
    ...region,
    count: countMap[region.key] ?? 0,
  }));
}

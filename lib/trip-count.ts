import { trips } from "#site/content";

export function getTripCountByCountry(country: string) {
  return trips.filter(
    (trip) => trip.country?.toLowerCase() === country.toLowerCase()
  ).length;
}

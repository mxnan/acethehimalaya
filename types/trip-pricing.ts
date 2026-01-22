export type TripPricing = {
  currency: string;
  base: number;
  tiers: {
    label: string;
    price: number;
  }[];
  bookingUrl?: string;
};

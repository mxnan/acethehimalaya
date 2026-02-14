export type TrekkingRegionConfig = {
  key: string;        // normalized
  label: string;      // display
  image: string;
};

export const TREKKING_REGIONS_NEPAL: TrekkingRegionConfig[] = [
  {
    key: "everest-region",
    label: "Everest Region",
    image: "/assets/landing/region/everest.jpg",
  },
  {
    key: "annapurna-region",
    label: "Annapurna Region",
  image: "/assets/landing/region/annapurna.jpg",
  },
  {
    key: "langtang-region",
    label: "Langtang Region",
  image: "/assets/landing/region/langtang.jpg",
  },
  {
    key: "manaslu-region",
    label: "Manaslu Region",
    image: "/assets/landing/region/manaslu.jpg",
  },
  {
    key: "dolpo-region",
    label: "Dolpo Region",
    image: "/assets/landing/region/dolpo.webp",
  },
  {
    key: "mustang-region",
    label: "Mustang Region",
    image: "/assets/landing/region/mustang.jpg",
  },
  {
    key: "dhaulagiri-region",
    label: "Dhaulagiri Region",
    image: "/assets/landing/region/dhaulagiri.jpg",
  },
  {
    key: "kanchenjunga-region",
    label: "Kanchenjunga Region",
    image: "/assets/landing/region/kanchenjunga.webp",
  },

];

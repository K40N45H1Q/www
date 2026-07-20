import ContentRows, {
  type ContentRow,
} from "@/components/ContentRows/ContentRows";

const items: ContentRow[] = [
  {
    title: "A Dedicated Workspace at Home",
    info: "A quiet and comfortable office just steps from your house",
    text: "A modular garden office gives you a separate place to work, focus and meet clients without sacrificing space inside your home. It creates a clear boundary between working hours and everyday living.",
    image: "/modular-garden-office/1.png",
    imageAlt: "Modern modular garden office",
  },
  {
    title: "Designed for Year-Round Comfort",
    info: "Insulated, practical and ready for every season",
    text: "Our garden offices are designed to remain comfortable throughout the year. Quality insulation, efficient glazing and carefully planned ventilation help create a reliable workspace in both warm and cold weather.",
    image: "/modular-garden-office/2.png",
    imageAlt: "Bright insulated garden office interior",
  },
  {
    title: "Built Around the Way You Work",
    info: "Flexible layouts for offices, studios and creative spaces",
    text: "The interior can be planned around your daily routine, with space for desks, storage, meeting areas and specialist equipment. Each building can be adapted to suit individual work, creative projects or a growing business.",
    image: "/modular-garden-office/3.jpg",
    imageAlt: "Contemporary garden office workspace",
  },
  {
    title: "Fast Installation with Minimal Disruption",
    info: "A streamlined alternative to a traditional extension",
    text: "Modular construction allows much of the building work to take place away from your property. This reduces time on site, limits disruption and provides a faster route to a finished, professional workspace.",
    image: "/modular-garden-office/4.jpg",
    imageAlt: "Modular garden office installed beside a home",
  },
];

export default function ModularGardenOfficePage() {
  return (
    <main>
      <ContentRows items={items} />
    </main>
  );
}
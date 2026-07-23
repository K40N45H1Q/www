import ContentRows, {
  type ContentRow,
} from "@/components/ContentRows/ContentRows";

const items: ContentRow[] = [
  {
    title: "What is DOFF Cleaning?",
    info: "A gentle and effective exterior cleaning system",
    text: "DOFF Cleaning uses superheated water and steam to remove dirt, moss, algae, mould, paint, graffiti and other stubborn deposits without damaging the surface.",
    image: "/doff-cleaning/1.jpg",
    imageAlt: "DOFF cleaning process",
  },
  {
    title: "Safe for Delicate Surfaces",
    info: "Low pressure, high temperature and minimal water",
    text: "Unlike conventional pressure washing, DOFF works at controlled low pressure. It is suitable for brick, natural stone, concrete, timber, terracotta, tiles and historic building façades.",
    image: "/doff-cleaning/2.jpg",
    imageAlt: "Cleaning a delicate exterior surface",
  },
  {
    title: "Effective Contamination Removal",
    info: "Suitable for stubborn organic and surface deposits",
    text: "The system helps remove moss, algae, mould, dirt, graffiti and selected coatings while preserving the underlying material.",
    image: "/doff-cleaning/3.webp",
    imageAlt: "Exterior surface being professionally cleaned",
  },
  {
    title: "Fast Drying and Minimal Water Use",
    info: "A controlled and efficient cleaning method",
    text: "Because DOFF uses a low volume of superheated water, treated surfaces avoid excessive saturation and can dry much faster than with conventional pressure washing.",
    image: "/doff-cleaning/4.png",
    imageAlt: "Clean restored building surface",
  },
];

export default function DoffCleaningPage() {
  return (
    <>
      <main>
        <ContentRows items={items} />
      </main>
    </>
  );
}

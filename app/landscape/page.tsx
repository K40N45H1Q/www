import ContentRows, {
  type ContentRow,
} from "@/components/ContentRows/ContentRows";

const items: ContentRow[] = [
  {
    title: "Thoughtful Landscape Design",
    info: "Outdoor spaces planned around your property and lifestyle",
    text: "We create practical and attractive landscape designs that bring together planting, pathways, seating areas and structural elements. Every detail is considered to make the space feel balanced, welcoming and easy to use.",
    image: "/landscape/1.jpg",
    imageAlt: "Professionally designed residential garden",
  },
  {
    title: "Garden Construction and Installation",
    info: "From the initial groundwork to the final finish",
    text: "Our team can transform an unused or outdated garden into a complete outdoor environment. We manage preparation, levels, drainage, edging, paving and planting to deliver a clean and durable result.",
    image: "/landscape/2.jpg",
    imageAlt: "Landscaping work in a residential garden",
  },
  {
    title: "Planting and Green Spaces",
    info: "Carefully selected plants for colour, structure and character",
    text: "We choose planting that suits the location, available light and desired level of maintenance. The result is a garden with year-round interest, natural texture and a clear visual identity.",
    image: "/landscape/7.jpg",
    imageAlt: "Landscaped garden with plants and lawn",
  },
  {
    title: "Patios, Paths and Outdoor Areas",
    info: "Functional surfaces designed for everyday outdoor living",
    text: "Well-planned patios and pathways make a garden easier to enjoy and move through. We create outdoor areas for dining, relaxing and entertaining using materials that complement the property and surrounding landscape.",
    image: "/landscape/8.jpg",
    imageAlt: "Modern garden patio and pathway",
  },
];

export default function LandscapePage() {
  return (
    <main>
      <ContentRows items={items} />
    </main>
  );
}
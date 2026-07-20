import ContentRows, {
  type ContentRow,
} from "@/components/ContentRows/ContentRows";

const items: ContentRow[] = [
  {
    title: "Modern Modular Living",
    info: "A smarter, faster way to create a high-quality home",
    text: "Our modular houses combine contemporary design, efficient construction and carefully considered interiors. Each home is built with precision in a controlled environment, helping reduce delays, disruption and unnecessary waste.",
    image: "/modular-house/1.jpeg",
    imageAlt: "Modern modular house exterior",
  },
  {
    title: "Designed Around Your Lifestyle",
    info: "Flexible layouts created for the way you want to live",
    text: "From open-plan living spaces to private bedrooms, home offices and practical storage, every layout can be shaped around your needs, your site and your long-term plans.",
    image: "/modular-house/2.jpg",
    imageAlt: "Bright interior of a modular house",
  },
  {
    title: "Quality Without Compromise",
    info: "Precision construction and durable materials",
    text: "Every module is manufactured to exact standards using reliable materials and carefully selected finishes. The result is a comfortable, durable and refined home built for everyday living.",
    image: "/modular-house/3.jpg",
    imageAlt: "Detailed finish of a modular home",
  },
  {
    title: "Efficient from Build to Installation",
    info: "Less disruption on site and a more predictable process",
    text: "Because much of the construction takes place off site, the installation process is faster and more controlled than traditional building. This helps minimise noise, weather delays and disruption around your property.",
    image: "/modular-house/4.jpg",
    imageAlt: "Modular house being installed on site",
  },
];

export default function ModularHousePage() {
  return (
    <main>
      <ContentRows items={items} />
    </main>
  );
}
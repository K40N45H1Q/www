import ContentRows, {
  type ContentRow,
} from "@/components/ContentRows/ContentRows";

const items: ContentRow[] = [
  {
    title: "Professional Fencing Installation",
    info: "Secure, practical and carefully built boundaries",
    text: "We install strong and reliable fencing for gardens, residential properties and outdoor spaces. Every fence is planned around the site, the required level of privacy and the overall style of the property.",
    image: "/fencing-building/1.jpg",
    imageAlt: "Professionally installed garden fence",
  },
  {
    title: "Timber Fencing Solutions",
    info: "Natural materials with a clean and durable finish",
    text: "Timber fencing is a versatile choice for privacy, security and visual definition. We build traditional and contemporary styles using carefully selected materials suited to long-term outdoor use.",
    image: "/fencing-building/3.webp",
    imageAlt: "Modern timber fence around a residential garden",
  },
  {
    title: "Gates and Access Points",
    info: "Practical entrances designed to match the fence",
    text: "We supply and install garden gates, side gates and access points that complement the surrounding fencing. Each gate is fitted for smooth operation, secure closure and everyday reliability.",
    image: "/fencing-building/2.jpg",
    imageAlt: "Wooden garden gate with matching fence",
  },
  {
    title: "Repairs and Fence Replacement",
    info: "Restoring damaged sections and improving existing boundaries",
    text: "We can repair unstable posts, damaged panels and worn sections or replace an outdated fence completely. The result is a safer, cleaner and more consistent boundary around the property.",
    image: "/fencing-building/5.jpg",
    imageAlt: "Fence repair and replacement work",
  },
];

export default function FencingBuildingPage() {
  return (
    <main>
      <ContentRows items={items} />
    </main>
  );
}
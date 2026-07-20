import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Property Services",
  description:
    "Professional DOFF cleaning, modular construction, landscaping, fencing and garden office services.",
};

const services = [
  {
    title: "DOFF Cleaning",
    description:
      "A specialist low-pressure cleaning system for brick, stone, timber and delicate exterior surfaces.",
    href: "/doff-cleaning",
  },
  {
    title: "Modular Houses",
    description:
      "Modern modular homes planned around your property, lifestyle and long-term requirements.",
    href: "/modular-house",
  },
  {
    title: "Landscaping",
    description:
      "Well-designed gardens and outdoor spaces created for practical, comfortable everyday living.",
    href: "/landscape",
  },
  {
    title: "Fencing",
    description:
      "Strong, carefully installed fencing and gates for privacy, security and a complete exterior.",
    href: "/fencing-building",
  },
  {
    title: "Modular Garden Offices",
    description:
      "Insulated, comfortable workspaces that create valuable room without extending your home.",
    href: "/modular-garden-office",
  },
];

const qualities = [
  {
    title: "Clear communication",
    text: "You know what is happening, what comes next and how the work is progressing.",
  },
  {
    title: "Careful preparation",
    text: "Every project starts with understanding the property and selecting the right approach.",
  },
  {
    title: "Professional finish",
    text: "We pay attention to the details that make the completed work feel considered and complete.",
  },
];

export default function HomePage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>Property Services</p>

            <h1 className={styles.heroTitle}>
              Everything your property needs.
              <span>One reliable team.</span>
            </h1>

            <div className={styles.heroFooter}>
              <p className={styles.heroText}>
                Specialist cleaning, landscaping, fencing and modular
                construction delivered with care, precision and a practical
                understanding of your property.
              </p>

              <div className={styles.heroActions}>
                <Link href="#services" className={styles.primaryButton}>
                  Explore services
                </Link>

                <Link href="#contact" className={styles.secondaryButton}>
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className={styles.services}>
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.sectionLabel}>What we do</p>

            <h2>
              Practical services for homes, buildings and outdoor spaces.
            </h2>
          </header>

          <div className={styles.serviceList}>
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className={styles.serviceItem}
              >
                <h3>{service.title}</h3>

                <p>{service.description}</p>

                <span className={styles.serviceArrow} aria-hidden="true">
                  ↗
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.approach}>
        <div className={styles.container}>
          <div className={styles.approachHeading}>
            <p className={styles.sectionLabel}>How we work</p>

            <div>
              <h2>Simple process. Carefully delivered.</h2>

              <p>
                We begin by understanding what your property needs. From there,
                we recommend a practical solution, plan the work properly and
                complete it with close attention to quality and detail.
              </p>
            </div>
          </div>

          <div className={styles.qualities}>
            {qualities.map((quality) => (
              <article key={quality.title} className={styles.quality}>
                <h3>{quality.title}</h3>
                <p>{quality.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className={styles.contact}>
        <div className={styles.container}>
          <div className={styles.contactInner}>
            <div className={styles.contactHeading}>
              <p className={styles.contactLabel}>Start a project</p>

              <h2>Let&apos;s talk about your property.</h2>
            </div>

            <div className={styles.contactContent}>
              <p>
                Tell us what you want to clean, improve or build. We will help
                you find the right next step.
              </p>

              <a
                href="mailto:hello@yourcompany.com"
                className={styles.contactButton}
              >
                Start a conversation
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
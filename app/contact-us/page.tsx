import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import RequestButton from "@/components/RequestButton/RequestButton";
import { services } from "@/data/services";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact Us | Property Services",
  description:
    "Contact us about DOFF cleaning or fencing work for your property.",
};

export default function ContactUsPage() {
  return (
    <main className={styles.page}>
      <section className={styles.intro}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>Contact us</p>
          <h1>Tell us what your property needs next.</h1>

          <div className={styles.introFooter}>
            <p>
              Send a short enquiry about DOFF cleaning or fencing. We will come
              back with a practical next step.
            </p>

            <RequestButton className={styles.primaryButton}>
              Open request
              <FiArrowUpRight aria-hidden="true" />
            </RequestButton>
          </div>
        </div>
      </section>

      <section className={styles.serviceSection} aria-labelledby="contact-services">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionLabel}>Project focus</p>
            <h2 id="contact-services">Two exterior services. One clear conversation.</h2>
          </div>

          <div className={styles.serviceList}>
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className={styles.serviceItem}
              >
                <span>{service.title}</span>
                <p>{service.description}</p>
                <FiArrowUpRight aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

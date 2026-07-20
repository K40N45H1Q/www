"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Dropdown, {
  type DropdownItem,
} from "@/components/Dropdown/Dropdown";
import styles from "./Header.module.css";

const services: DropdownItem[] = [
  {
    label: "DOFF Cleaning",
    href: "/doff-cleaning",
  },
  {
    label: "Modular House",
    href: "/modular-house",
  },
  {
    label: "Landscape",
    href: "/landscape",
  },
  {
    label: "Fencing Building",
    href: "/fencing-building",
  },
  {
    label: "Modular Garden Office",
    href: "/modular-garden-office",
  },
];

export default function Header() {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const isServicePage = services.some(
    ({ href }) =>
      pathname === href || pathname.startsWith(`${href}/`),
  );

  const isServicesActive = isServicePage || isServicesOpen;

  function closeMobileMenu() {
    setIsMenuOpen(false);
  }

  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link
          href="/"
          className={styles.logo}
          onClick={closeMobileMenu}
          aria-label="Go to homepage"
        >
          Company
        </Link>

        <nav
          className={styles.desktopNavigation}
          aria-label="Main navigation"
        >
          <div
            className={`${styles.servicesItem} ${
              isServicesActive ? styles.servicesItemActive : ""
            }`}
          >
            <Dropdown
              label="Services"
              items={services}
              onOpenChange={setIsServicesOpen}
            />
          </div>

          <Link
            href="/#contact"
            className={styles.contactButton}
          >
            Contact us
          </Link>
        </nav>

        <button
          type="button"
          className={`${styles.menuButton} ${
            isMenuOpen ? styles.menuButtonOpen : ""
          }`}
          onClick={() => {
            setIsMenuOpen((current) => !current);
          }}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        className={`${styles.mobileMenu} ${
          isMenuOpen ? styles.mobileMenuOpen : ""
        }`}
        aria-hidden={!isMenuOpen}
      >
        <nav
          id="mobile-navigation"
          className={styles.mobileNavigation}
          aria-label="Mobile navigation"
        >
          <ul className={styles.mobileServicesList}>
            {services.map((service) => (
              <li key={service.href}>
                <Link
                  href={service.href}
                  className={styles.mobileServiceLink}
                  onClick={closeMobileMenu}
                  tabIndex={isMenuOpen ? 0 : -1}
                >
                  {service.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/#contact"
            className={styles.mobileContactButton}
            onClick={closeMobileMenu}
            tabIndex={isMenuOpen ? 0 : -1}
          >
            Contact us
          </Link>
        </nav>
      </div>
    </header>
  );
}
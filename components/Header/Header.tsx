"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiArrowUpRight, FiMenu, FiX } from "react-icons/fi";
import ThemeSwitcher from "@/components/ThemeSwitcher/ThemeSwitcher";
import { services } from "@/data/services";
import { publicAsset } from "@/lib/sitePath";
import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMobileMenu() {
    setIsMenuOpen(false);
  }

  function isNavItemActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsMenuOpen(false);
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
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
          <Image
            src={publicAsset("/favicon.ico")}
            alt=""
            width={40}
            height={40}
            className={styles.logoImage}
          />
          <span>Company</span>
        </Link>

        <nav
          className={styles.desktopNavigation}
          aria-label="Main navigation"
        >
          {services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className={`${styles.navItem} ${
                isNavItemActive(service.href) ? styles.navItemActive : ""
              }`}
              aria-current={
                isNavItemActive(service.href) ? "page" : undefined
              }
            >
              {service.title}
            </Link>
          ))}

          <Link
            href="/contact-us"
            className={`${styles.navItem} ${
              isNavItemActive("/contact-us") ? styles.navItemActive : ""
            }`}
            aria-current={
              isNavItemActive("/contact-us") ? "page" : undefined
            }
          >
            Contact us
          </Link>

          <ThemeSwitcher />

        </nav>

        <div className={styles.mobileActions}>
          <ThemeSwitcher />

          <button
            type="button"
            className={styles.menuButton}
            onClick={() => {
              setIsMenuOpen((current) => !current);
            }}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? (
              <FiX aria-hidden="true" />
            ) : (
              <FiMenu aria-hidden="true" />
            )}
          </button>
        </div>
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
                  aria-current={
                    isNavItemActive(service.href) ? "page" : undefined
                  }
                >
                  <span>{service.title}</span>
                  <FiArrowUpRight aria-hidden="true" />
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact-us"
                className={styles.mobileServiceLink}
                onClick={closeMobileMenu}
                tabIndex={isMenuOpen ? 0 : -1}
                aria-current={
                  isNavItemActive("/contact-us") ? "page" : undefined
                }
              >
                <span>Contact us</span>
                <FiArrowUpRight aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

"use client";

import { type FormEvent, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import Dropdown from "@/components/Dropdown/Dropdown";
import { services } from "@/data/services";
import styles from "./RequestForm.module.css";

type FormState = "idle" | "submitting" | "success" | "error";

const isStaticExport = process.env.NEXT_PUBLIC_GITHUB_PAGES === "true";

type RequestFormProps = {
  isInteractive?: boolean;
  variant?: "page" | "modal";
};

export default function RequestForm({
  isInteractive = true,
  variant = "page",
}: RequestFormProps) {
  const [formState, setFormState] = useState<FormState>("idle");
  const [selectedService, setSelectedService] = useState("");
  const tabIndex = isInteractive ? undefined : -1;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (!formData.get("service")) {
      setFormState("error");
      return;
    }

    setFormState("submitting");

    try {
      if (isStaticExport) {
        form.reset();
        setSelectedService("");
        setFormState("success");
        return;
      }

      const response = await fetch("/api/request", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      form.reset();
      setSelectedService("");
      setFormState("success");
    } catch {
      setFormState("error");
    }
  }

  if (formState === "success") {
    return (
      <div className={styles.success} role="status">
        <span className={styles.successMark} aria-hidden="true">
          <FiArrowUpRight />
        </span>
        <h2>Thank you.</h2>
        <p>Your request has been sent. We will contact you shortly.</p>
      </div>
    );
  }

  return (
    <form
      className={`${styles.form} ${
        variant === "modal" ? styles.formModal : styles.formPage
      }`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label className={styles.field}>
          <span>First name</span>
          <input
            type="text"
            name="firstName"
            autoComplete="given-name"
            required
            tabIndex={tabIndex}
          />
        </label>

        <label className={styles.field}>
          <span>Last name</span>
          <input
            type="text"
            name="lastName"
            autoComplete="family-name"
            required
            tabIndex={tabIndex}
          />
        </label>
      </div>

      <div className={styles.row}>
        <label className={styles.field}>
          <span>Email</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            tabIndex={tabIndex}
          />
        </label>

        <label className={styles.field}>
          <span>Phone number</span>
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            inputMode="tel"
            required
            tabIndex={tabIndex}
          />
        </label>
      </div>

      <label className={styles.field}>
        <span>Service</span>
        <Dropdown
          label="Service"
          name="service"
          placeholder="Select a service"
          required
          tabIndex={tabIndex}
          value={selectedService}
          variant="form"
          onValueChange={setSelectedService}
          items={services.map((service) => ({
            label: service.title,
            value: service.id,
          }))}
        />
      </label>

      <label className={styles.field}>
        <span>Tell us about your project</span>
        <textarea
          name="message"
          rows={variant === "modal" ? 5 : 7}
          required
          tabIndex={tabIndex}
        />
      </label>

      {formState === "error" && (
        <p className={styles.error} role="alert">
          Failed to send the request. Please try again.
        </p>
      )}

      <button
        type="submit"
        className={styles.submitButton}
        disabled={formState === "submitting"}
        tabIndex={tabIndex}
      >
        <span>
          {formState === "submitting" ? "Sending..." : "Send request"}
        </span>
        <FiArrowUpRight aria-hidden="true" />
      </button>
    </form>
  );
}

import Image from "next/image";
import { publicAsset } from "@/lib/sitePath";
import styles from "./ContentRows.module.css";

export type ContentRow = {
  title: string;
  info?: string;
  text: string;
  image: string;
  imageAlt?: string;
};

type ContentRowsProps = {
  items: ContentRow[];
};

export default function ContentRows({ items }: ContentRowsProps) {
  return (
    <section className={styles.models}>
      <span className={styles.line} aria-hidden="true" />

      {items.map((item, index) => (
        <article
          className={`${styles.model} ${
            index % 2 !== 0 ? styles.modelReverse : ""
          }`}
          key={`${item.title}-${index}`}
        >
          <div className={styles.content}>
            {item.info && <small>{item.info}</small>}

            <h2>{item.title}</h2>
            <p>{item.text}</p>
          </div>

          <span className={styles.dot} aria-hidden="true" />

          <div className={styles.image}>
            <Image
              src={publicAsset(item.image)}
              alt={item.imageAlt || item.title}
              fill
              sizes="(max-width: 700px) 100vw, 50vw"
            />
          </div>
        </article>
      ))}
    </section>
  );
}

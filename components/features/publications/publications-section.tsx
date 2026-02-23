"use client";
import { PUBLICATIONS } from "data/portfolio";
import { formatDate } from "utils/date";

import { motion } from "framer-motion";

export function PublicationsSection() {
  return (
    <section className="mb-32">
      <h2 className="mb-12 ml-1 text-sm font-semibold tracking-widest text-stone-900 uppercase dark:text-stone-100">
        Publications
      </h2>
      <motion.div
        className="space-y-12"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
          },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {PUBLICATIONS.map((pub, idx) => (
          <motion.div
            key={idx}
            className="group flex flex-col border-t border-stone-200 pt-6 dark:border-stone-800"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: "easeOut" },
              },
            }}
          >
            <div className="mb-4 flex flex-col justify-between md:flex-row md:items-baseline">
              <h3 className="max-w-2xl text-2xl leading-tight font-bold text-stone-900 decoration-1 underline-offset-4 group-hover:underline dark:text-stone-100">
                {pub.link ? (
                  <a href={pub.link} target="_blank" rel="noopener noreferrer">
                    {pub.title}
                  </a>
                ) : (
                  pub.title
                )}
              </h3>
              <div className="mt-2 font-mono text-sm whitespace-nowrap text-stone-400 md:mt-0">
                {formatDate(pub.date)}
              </div>
            </div>

            <div className="max-w-3xl space-y-4">
              <div className="text-sm font-semibold tracking-wider text-stone-500 uppercase dark:text-stone-400">
                {pub.conference}
              </div>
              <div className="text-lg leading-relaxed text-stone-600 dark:text-stone-300">
                {Array.isArray(pub.description) ? (
                  <ul className="ml-5 list-outside list-disc space-y-2">
                    {pub.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{pub.description}</p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

import { baseUrl } from "app/sitemap";

export function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Nikzad Khani",
    url: baseUrl,
    jobTitle: "Software Engineer",
    alumniOf: "Boston University",
    sameAs: [
      "https://github.com/nikzadkhani",
      "https://linkedin.com/in/nikzadkhani",
      // Add other social profiles here if available
    ],
    description:
      "Software Engineer specializing in Go and Python. Building scalable AI-driven applications and robust data pipelines.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

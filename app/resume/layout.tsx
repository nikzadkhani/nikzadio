import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description: "My professional experience and skills.",
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

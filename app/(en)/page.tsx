import type { Metadata } from "next";
import { HomePage } from "@/components/home-page";
import { getDictionary } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

const dict = getDictionary("en");

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/",
  title: dict.meta.title,
  description: dict.meta.description
});

export default function Page() {
  return <HomePage locale="en" />;
}

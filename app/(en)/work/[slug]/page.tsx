import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CasePage } from "@/components/case-page";
import { caseSlugs, getCase } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseSlugs.map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCase("en", slug);
  if (!caseStudy) return {};
  return pageMetadata({
    locale: "en",
    path: `/work/${slug}`,
    title: `${caseStudy.metaTitle} - Iter Labs`,
    description: caseStudy.metaDescription,
    ogType: "article"
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const caseStudy = getCase("en", slug);
  if (!caseStudy) notFound();
  return <CasePage locale="en" caseStudy={caseStudy} />;
}

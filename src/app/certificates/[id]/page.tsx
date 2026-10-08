import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FaArrowLeft, FaArrowRight, FaAward, FaCheckCircle, FaGoogle } from "react-icons/fa";
import { SiHubspot, SiMeta } from "react-icons/si";
import { getCertificates } from "@/lib/content";
import BackLink from "@/components/back-link";

const issuerMeta: Record<string, { Icon: any; tone: string }> = {
  Google: { Icon: FaGoogle, tone: "#4285F4" },
  HubSpot: { Icon: SiHubspot, tone: "#FF7A59" },
  Meta: { Icon: SiMeta, tone: "#0866FF" },
};



export async function generateStaticParams() {
  const certificates = await getCertificates();
  return certificates.map((certificate) => ({ id: String(certificate.id) }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const certificates = await getCertificates();
  const certificate = certificates.find((item) => item.id === id);
  if (!certificate) return { title: "Certificate" };
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  return {
    title: certificate.title,
    description: certificate.description || `${certificate.issuer} certification issued in ${certificate.year}.`,
    alternates: siteUrl ? { canonical: `${siteUrl}/certificates/${id}` } : undefined,
    openGraph: certificate.image ? { images: [certificate.image] } : undefined,
  };
}

export default async function CertificateViewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const certificates = await getCertificates();
  const certificate = certificates.find((item) => item.id === id);
  if (!certificate) notFound();

  const meta = issuerMeta[certificate.issuer] || { Icon: FaAward, tone: "#168BFF" };
  const IssuerIcon = meta.Icon;

  return (
    <main className="certificate-view-page">
      <div className="certificate-view-shell">
        <BackLink fallbackHref="/#certificates" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 transition hover:text-white">
          <FaArrowLeft className="text-[10px]" /> Back to Certifications
        </BackLink>

        <div className="mt-8 certificate-view-card">
          <div className="certificate-view-image-wrap">
            {certificate.image ? (
              <Image
                src={certificate.image}
                alt={`${certificate.issuer} ${certificate.title}`}
                width={1600}
                height={1100}
                priority
                className="certificate-view-image"
              />
            ) : (
              <div className="certificate-lightbox-empty"><FaAward /> Certificate preview unavailable</div>
            )}
          </div>

          <div className="certificate-view-info">
            <div className="eyebrow">Certificate Verification</div>
            <div className="mt-5 flex items-center gap-2 font-bold" style={{ color: meta.tone }}>
              <IssuerIcon /> <span>{certificate.issuer}</span>
            </div>
            <h1>{certificate.title}</h1>
            <p>{certificate.description}</p>

            <div className="certificate-view-meta">
              <div><span>Status</span><b><FaCheckCircle className="mr-1 inline text-emerald-400" /> Verified</b></div>
              <div><span>Issued</span><b>{certificate.year}</b></div>
              <div><span>Issuer</span><b>{certificate.issuer}</b></div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/certificates" className="outline-button">
                <FaArrowLeft className="mr-2 text-[10px]" /> All Certificates
              </Link>
              <Link href="/#contact" className="gradient-button">
                Let&apos;s Work Together <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

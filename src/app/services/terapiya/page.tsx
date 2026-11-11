import { ServiceDetail } from "@/components/service-detail";
import { servicePageMetadata } from "@/lib/service-pages";

export const metadata = servicePageMetadata("terapiya");

export default function TerapiyaPage() {
  return <ServiceDetail slug="terapiya" />;
}

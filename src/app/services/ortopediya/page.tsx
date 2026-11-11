import { ServiceDetail } from "@/components/service-detail";
import { servicePageMetadata } from "@/lib/service-pages";

export const metadata = servicePageMetadata("ortopediya");

export default function OrtopediyaPage() {
  return <ServiceDetail slug="ortopediya" />;
}

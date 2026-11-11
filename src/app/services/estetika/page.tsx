import { ServiceDetail } from "@/components/service-detail";
import { servicePageMetadata } from "@/lib/service-pages";

export const metadata = servicePageMetadata("estetika");

export default function EstetikaPage() {
  return <ServiceDetail slug="estetika" />;
}

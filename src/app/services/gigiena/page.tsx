import { ServiceDetail } from "@/components/service-detail";
import { servicePageMetadata } from "@/lib/service-pages";

export const metadata = servicePageMetadata("gigiena");

export default function GigienaPage() {
  return <ServiceDetail slug="gigiena" />;
}

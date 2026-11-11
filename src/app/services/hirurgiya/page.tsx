import { ServiceDetail } from "@/components/service-detail";
import { servicePageMetadata } from "@/lib/service-pages";

export const metadata = servicePageMetadata("hirurgiya");

export default function HirurgiyaPage() {
  return <ServiceDetail slug="hirurgiya" />;
}

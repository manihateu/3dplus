import { ServiceDetail } from "@/components/service-detail";
import { servicePageMetadata } from "@/lib/service-pages";

export const metadata = servicePageMetadata("implantaciya");

export default function ImplantaciyaPage() {
  return <ServiceDetail slug="implantaciya" />;
}

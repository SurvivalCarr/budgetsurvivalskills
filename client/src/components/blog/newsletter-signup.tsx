import { PDFDownloadSignup } from "@/components/pdf-download-signup";
import { useRegion } from "@/components/region-selector";

export function NewsletterSignup() {
  const { selectedRegion } = useRegion();

  return <PDFDownloadSignup selectedRegion={selectedRegion} />;
}

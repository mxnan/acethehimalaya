import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { NewsletterForm } from "./newsletter-form";
import { Icons } from "../brand";
import { Map, MapControls, MapMarker, MarkerContent, MarkerPopup } from "../ui/map";

export default function FooterNewsletterBrand() {
  return (
    <section className="mb-8 relative w-full flex flex-col max-lg:items-center lg:flex-row gap-8">
      <Card className="min-h-[300px] w-full lg:w-1/3 grow">
        <CardHeader className="px-6 pt-6">
          <CardTitle className="text-3xl">Subscribe Now!</CardTitle>
          <CardDescription className="font-semibold">
            Get travel tips, exclusive offers, and the latest updates on our
            adventures. We also keep you informed about new blog posts, guides,
            and special promotions.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6 pb-6">
          <NewsletterForm />
        </CardContent>
      </Card>

      <Card className="lg:max-h-[354px] w-full lg:w-2/3 grow overflow-hidden shadow-none p-2 border-none bg-primary-background">
        <Icons.brandlogo className="w-full h-full" />
      </Card>
    </section>
  );
}

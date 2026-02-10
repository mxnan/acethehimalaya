import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import Link from "next/link";
import { Separator } from "../ui/separator";

export default function FooterThree() {
  return (
    <div className="relative px-4 lg:px-6">
      <div className="relative w-full flex flex-col gap-8">
        {/* ROW 1 */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Explore all activities */}
          <Card className="w-full md:w-2/3 p-6 lg:p-8">
            <CardHeader>
              <CardTitle>Explore all activities</CardTitle>
              <Separator className="my-2 max-w-xs" />
            </CardHeader>

            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm">
              <FooterLink href="/categories/trekking">Trekking in Nepal</FooterLink>
              <FooterLink href="/categories/luxury-treks">Luxury Treks</FooterLink>
              <FooterLink href="/categories/climbing-expedition">Climbing & Expedition</FooterLink>
              <FooterLink href="/categories/cultural-tours">Cultural Tours</FooterLink>
              <FooterLink href="/categories/cycling-mountain-biking">Cycling / MTB</FooterLink>
              <FooterLink href="/categories/pilgrimage">Pilgrimage</FooterLink>
            </CardContent>
          </Card>

          {/* Socials */}
          <Card className="w-full md:w-1/3 p-6 lg:p-8">
            <CardHeader>
              <CardTitle>Socials</CardTitle>
              <Separator className="my-2 max-w-xs" />
            </CardHeader>

            <CardContent className="flex flex-col gap-3 text-sm">
              <ExternalLink href="https://instagram.com">Instagram</ExternalLink>
              <ExternalLink href="https://facebook.com">Facebook</ExternalLink>
              <ExternalLink href="https://youtube.com">YouTube</ExternalLink>
              <ExternalLink href="https://tripadvisor.com">
                TripAdvisor
              </ExternalLink>
            </CardContent>
          </Card>
        </div>
        {/* ROW 2 */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Explore more */}
          <Card className="w-full md:w-1/3 p-6 lg:p-8">
            <CardHeader>
              <CardTitle>Explore more</CardTitle>
              <Separator className="my-2 max-w-xs" />
            </CardHeader>

            <CardContent className="flex flex-col gap-3 text-sm">
              <FooterLink href="/trips/nepal">
                Nepal <span className="opacity-60 ml-1">10 trips</span>
              </FooterLink>
              <FooterLink href="/trips/bhutan">
                Bhutan <span className="opacity-60 ml-1">10 trips</span>
              </FooterLink>
              <FooterLink href="/trips/tibet">
                Tibet <span className="opacity-60 ml-1">10 trips</span>
              </FooterLink>
            </CardContent>
          </Card>

          {/* Company */}
          <Card className="w-full md:w-2/3 p-6 lg:p-8">
            <CardHeader>
              <CardTitle>Company</CardTitle>
              <Separator className="my-2 max-w-xs" />
            </CardHeader>

            <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-y-3 gap-x-6 text-sm">
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
              <FooterLink href="/careers">Careers</FooterLink>
              <FooterLink href="/blogs">Blog</FooterLink>
              <FooterLink href="/faqs">FAQs</FooterLink>
              <FooterLink href="/terms">Terms & Conditions</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
            </CardContent>
          </Card>
        </div>
        <AwardsLogo />
      </div>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="hover:underline underline-offset-4 transition-colors"
    >
      {children}
    </Link>
  );
}

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:underline underline-offset-4 transition-colors"
    >
      {children}
    </a>
  );
}

const AwardsLogo = () => {
  return (
    <>
      <Card className="max-h-[300px] aspect-video w-full bg-neutral-600 dark:bg-neutral-900">
        <CardContent className="p-6 h-full flex items-center justify-center">
          {/* Image wrapper */}
          <div className="relative h-full aspect-video overflow-hidden rounded-md">
            <Image
              src="/assets/landing/footer/award2025.png"
              alt="Traveler’s Choice Best of the Best Award 2025"
              fill
              className="object-contain object-center"
              priority
            />
          </div>
        </CardContent>
      </Card>
    </>
  )
}
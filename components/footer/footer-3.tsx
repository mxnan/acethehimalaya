"use client";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import Link from "next/link";
import { Separator } from "../ui/separator";
import InstagramIcon from "../ui/icons/instagram-icon";
import FacebookIcon from "../ui/icons/facebook-icon";
import YoutubeIcon from "../ui/icons/youtube-icon";
import TwitterXIcon from "../ui/icons/twitter-x-icon";
import { Button } from "../ui/button";
import { useRef } from "react";
import { AnimatedIconHandle } from "../ui/icons/types";

export default function FooterThree() {
  const iconRef = useRef<AnimatedIconHandle>(null);

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
              <FooterLink href="/trips/trekking">
                Trekking in Nepal
              </FooterLink>
              <FooterLink href="/trips/cultural-tour-and-sightseeing">
                Cultural Tour and Sightseeing
              </FooterLink>
              <FooterLink href="/trips/climbing-and-expedition">
                Climbing & Expedition
              </FooterLink>
              <FooterLink href="/trips/cycling-and-mountain-biking">
                Cycling and Mountain Biking
              </FooterLink>
              <FooterLink href="/trips/luxury-treks">Luxury Treks</FooterLink>
              <FooterLink href="/trips/extend-your-trip">
                Extend Your Trip
              </FooterLink>
            </CardContent>
          </Card>

          {/* Socials */}
          <Card className="w-full md:w-1/3 p-6 lg:p-8">
            <CardHeader>
              <CardTitle>Socials</CardTitle>
              <Separator className="my-2 max-w-xs" />
            </CardHeader>

            <CardContent className="grid grid-cols-4 gap-4 place-items-center">
              <SocialIconLink href="https://instagram.com">
                <InstagramIcon size={28} />
              </SocialIconLink>

              <SocialIconLink href="https://facebook.com">
                <FacebookIcon size={28} />
              </SocialIconLink>

              <SocialIconLink href="https://youtube.com">
                <YoutubeIcon size={28} />
              </SocialIconLink>

              <SocialIconLink href="https://tripadvisor.com">
                <TwitterXIcon size={28} />
              </SocialIconLink>
              <Separator className="my-2 max-w-xs" />
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
              <FooterLink href="/company">About Us</FooterLink>
              <FooterLink href="/company/why-ace">Why Ace</FooterLink>
              <FooterLink href="/company/awards">Awards</FooterLink>
              <FooterLink href="/company/csi">CSI</FooterLink>
              <FooterLink href="/company/team">Team</FooterLink>
              <FooterLink href="/company/mission-statement">Mission</FooterLink>
              <FooterLink href="/company/founder">Meet our Founder</FooterLink>
              <FooterLink href="/company/partner">Partner with ACE</FooterLink>
            </CardContent>
          </Card>
        </div>
        <AwardsLogo />
      </div>
    </div>
  );
}

function SocialIconLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-14 w-14 items-center justify-center rounded-lg bg-background/40 backdrop-blur-md border border-border
                 transition-all duration-300 hover:bg-muted hover:scale-105"
    >
      {children}
    </Link>
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
    <Link href={href} className="custom-underline w-max pb-2">
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
      className="custom-underline w-max pb-2"
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
  );
};

import Link from "next/link";
import { Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const footerLinks = {
  trips: [
    { label: "All Trips", href: "/trips" },
    { label: "Nepal", href: "/trips/nepal" },
    { label: "Bhutan", href: "/trips/bhutan" },
    { label: "Tibet", href: "/trips/tibet" },
  ],
  blogs: [
    { label: "All Blogs", href: "/blogs" },
    { label: "MDX Guide", href: "/blogs/mdx-gist" },
    { label: "Style Guide", href: "/blogs/style-guide" },
  ],
  company: [
    { label: "About Us", href: "/company" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const socialLinks = [
  { href: "https://instagram.com", label: "Instagram", icon: Instagram },
  { href: "https://facebook.com", label: "Facebook", icon: Facebook },
  { href: "https://twitter.com", label: "Twitter", icon: Twitter },
  { href: "https://youtube.com", label: "YouTube", icon: Youtube },
];

const contactInfo = [
  { icon: Mail, label: "Email", value: "info@acethehimalaya.com", href: "mailto:info@acethehimalaya.com" },
  { icon: Phone, label: "Phone", value: "+977-1-1234567", href: "tel:+97711234567" },
  { icon: MapPin, label: "Address", value: "Kathmandu, Nepal", href: null },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <h2 className="text-2xl font-bold tracking-wide">AceTheHimalaya</h2>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Experience the difference with our premium Himalayan adventures. 
              Discover breathtaking landscapes and create unforgettable memories.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Button
                    key={social.href}
                    asChild
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9"
                    aria-label={social.label}
                  >
                    <Link
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon className="h-4 w-4" />
                    </Link>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Trips Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide">Trips</h3>
            <ul className="space-y-2">
              {footerLinks.trips.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-sm text-muted-foreground transition-colors",
                      "hover:text-foreground hover:underline"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Blogs & Company Section */}
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide">Blogs</h3>
              <ul className="space-y-2">
                {footerLinks.blogs.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "text-sm text-muted-foreground transition-colors",
                        "hover:text-foreground hover:underline"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide">Company</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "text-sm text-muted-foreground transition-colors",
                        "hover:text-foreground hover:underline"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide">Contact</h3>
            <ul className="space-y-3">
              {contactInfo.map((contact) => {
                const Icon = contact.icon;
                const content = (
                  <div className="flex items-start gap-3">
                    <Icon className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                    <div className="space-y-0.5">
                      <p className="text-xs text-muted-foreground">{contact.label}</p>
                      <p className="text-sm text-foreground">{contact.value}</p>
                    </div>
                  </div>
                );

                return (
                  <li key={contact.label}>
                    {contact.href ? (
                      <Link
                        href={contact.href}
                        className={cn(
                          "block transition-colors",
                          "hover:text-primary"
                        )}
                      >
                        {content}
                      </Link>
                    ) : (
                      <div>{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {currentYear} AceTheHimalaya. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link
                href="/privacy"
                className="transition-colors hover:text-foreground"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="transition-colors hover:text-foreground"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


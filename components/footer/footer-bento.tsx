import Link from "next/link";
import { Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/brand";

export default function FooterBento() {
    const footerLinks = {
        trips: [
            { label: "All Trips", href: "/trips" },
            { label: "Nepal", href: "/trips/nepal/nepal1" },
            { label: "Bhutan", href: "/trips/bhutan/bhutan1" },
            { label: "Tibet", href: "/trips/tibet/tibet1" },
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


    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-4 sm:grid-rows-4">

            {/* Brand (top-left) */}
            <div className="rounded-2xl p-6 sm:col-span-2">
                <Link href="/" className="inline-flex items-center gap-3">
                    <Icons.navlogo className="h-8 w-auto" />
                    <span className="sr-only">AceTheHimalaya</span>
                </Link>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    Experience the difference with our premium Himalayan adventures.
                    Discover breathtaking landscapes and create unforgettable memories.
                </p>
                <div className="flex items-center gap-3 pt-4">
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
                                <Link href={social.href} target="_blank" rel="noopener noreferrer">
                                    <Icon className="h-4 w-4" />
                                </Link>
                            </Button>
                        );
                    })}
                </div>
            </div>

            {/* Trips (top-right) */}
            <div className="rounded-2xl p-6 sm:col-span-2">
                <h3 className="text-sm font-semibold uppercase tracking-wide">Trips</h3>
                <ul className="mt-3 space-y-2">
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

            {/* Blogs (middle-left) */}
            <div className="rounded-2xl p-6 sm:col-span-2">
                <h3 className="text-sm font-semibold uppercase tracking-wide">Blogs</h3>
                <ul className="mt-3 space-y-2">
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

            {/* Contact (middle-right) */}
            <div className="rounded-2xl p-6 sm:col-span-2 sm:col-start-3">
                <h3 className="text-sm font-semibold uppercase tracking-wide">Contact</h3>
                <ul className="mt-3 space-y-3">
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
                                    <Link href={contact.href} className={cn("block transition-colors", "hover:text-primary")}>
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

            {/* Company (full width bottom) */}
            <div className="rounded-2xl p-6 sm:col-span-4">
                <h3 className="text-sm font-semibold uppercase tracking-wide">Company</h3>
                <ul className="mt-3 flex flex-wrap gap-4">
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
    )
}

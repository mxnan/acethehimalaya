
import { LaptopMinimalCheckIcon } from 'lucide-react';
import { Separator } from '../ui/separator'
import Link from 'next/link'

export default function FooterBottom() {
    const currentYear = new Date().getFullYear();
    return (
        <div className="my-10">
            {/* Separator replacing border-top */}
            <Separator className="my-10" />
            <div className="">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">

                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <p className="text-sm text-muted-foreground text-center md:text-left">
                            © {currentYear} AceTheHimalaya.
                        </p> <Link
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
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <LaptopMinimalCheckIcon className="inline-block ml-1 size-10 stroke-1" /> by
                        <Link
                            href="https://acehimalaya.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-1 pt-2 pb-2 font-bold custom-underline transition-colors hover:text-foreground"
                        >
                           @mxnan
                        </Link>
                    </div>
                </div>
            </div>
            <Separator className="my-10" />
        </div>
    )
}

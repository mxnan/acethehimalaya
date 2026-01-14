
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
            <Separator className="my-10" />
        </div>
    )
}

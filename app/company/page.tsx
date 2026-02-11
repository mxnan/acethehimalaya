import { Icons } from '@/components/brand';
import YTEmbed from '@/components/mdx/yt-embed';
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link'


export const metadata: Metadata = {
    title: "Intro",
    description:
        "Welcome to ACE The Himalaya",

};

function Intro() {
    return (
        <>
            <div className='text-center'>
                <div className="mb-10 ">
                    <Card className="my-16 lg:max-h-[300px] aspect-video w-full grow overflow-hidden shadow-none border-none bg-primary-background">
                        <Icons.brandlogo className="w-full h-full" />
                    </Card>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                        Built in the Himalayas. Trusted worldwide.
                    </h2>
                    <Separator className="my-4 max-w-3xl mx-auto" />
                    <div className='space-y-2'>
                        <p className="text-sm sm:text-base text-muted-foreground">
                            <strong>Ace the Himalaya</strong> is one of Nepal's leading adventure travel companies, trusted by thousands of international trekkers every year. Founded by <strong>Prem K Khatry</strong> in 2006, we started as a locally owned operator with one mission: deliver authentic Himalayan experiences led by people who truly know these trails—not just from maps, but from a lifetime in these mountains.
                        </p>
                        <p className="text-sm sm:text-base text-muted-foreground">
                            Today, we're <strong>Travelife Certified</strong>, a TripAdvisor <strong>Travelers' Choice award winner</strong>, and the only trekking company in Nepal using <strong>Katadyn water filtration</strong> systems to eliminate single-use plastics on every trek. With international representatives in the <strong>USA, Switzerland, Indonesia, and South Korea,</strong> we connect travelers worldwide to experiences built on safety, local knowledge, and genuine cultural respect.

                        </p>
                        <p className="text-sm sm:text-base text-muted-foreground">
                            Whether you're a solo adventurer, a family, or a group chasing a summit, you're partnering with a team that's been leading these mountains for nearly two decades—and doing it the right way.
                        </p>
                    </div>
                </div>
                <div className='max-w-5xl mx-auto aspect-video'>
                    <YTEmbed url="https://youtu.be/DLVoMDgKpdo?si=6VfsWK4zq9oNZFMY" autoplay />
                </div>
                <p className="mt-16 text-sm sm:text-base text-muted-foreground">
                    Explore who we are, what we stand for, and why travelers from over 50 countries choose <strong>Ace the Himalaya.</strong>
                </p>
            </div>
        </>
    )
}
interface CompanyTileCardProps {
    href: string;
    title: string;
    image: string;
    className?: string;
    overlay?: boolean;
}
function CompanyTileCard({
    href,
    title,
    image,
    className,
    overlay = true,
}: CompanyTileCardProps) {
    return (
        <Link
            href={href}
            className={cn("group block w-full", className)}
        >
            <Card className="relative h-64 aspect-video w-full overflow-hidden rounded-xl border-none shadow-sm transition-shadow hover:shadow-lg">

                {/* Image */}
                <div className="absolute inset-0">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        priority
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw,
                   (max-width: 1024px) 50vw,
                   33vw"
                    />
                </div>

                {/* Optional Gradient Overlay */}
                {overlay && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                )}

                {/* Content */}
                <div className="relative z-10 flex h-full w-full items-center justify-center p-6 text-center">
                    <div className="rounded-lg bg-black/50 backdrop-blur-md px-4 py-2">
                        <h3 className="text-lg sm:text-xl font-semibold text-white">
                            {title}
                        </h3>
                    </div>
                </div>
            </Card>
        </Link>
    );
}



export default function IntroPage() {
    return (
        <div className="relative w-full min-h-screen">
            <div className='max-w-7xl mx-auto'>
                <Intro />
                <Separator className='my-8' />
                <div className='space-y-4'>
                    <div className='flex flex-col md:flex-row gap-4'>
                        <CompanyTileCard
                            href="/company/why-ace"
                            title="Why ACE?"
                            image="/trips/nepal/everest-base-camp-trek/cover.jpg"
                            className='md:w-2/3  grow '
                        />
                        <CompanyTileCard
                            href="/company/why-ace"
                            title="Why ACE?"
                            image="/trips/nepal/everest-base-camp-trek/cover.jpg"
                            className='md:w-1/3  grow '
                        />
                    </div>
                    <div className='flex flex-col md:flex-row gap-4'>
                        <CompanyTileCard
                            href="/company/why-ace"
                            title="Why ACE?"
                            image="/trips/nepal/everest-base-camp-trek/cover.jpg"
                            className='md:w-1/3  grow '
                        />
                        <CompanyTileCard
                            href="/company/why-ace"
                            title="Why ACE?"
                            image="/trips/nepal/everest-base-camp-trek/cover.jpg"
                            className='md:w-2/3  grow '
                        />
                    </div>
                    <div className='flex flex-col md:flex-row gap-4'>
                        <CompanyTileCard
                            href="/company/why-ace"
                            title="Why ACE?"
                            image="/trips/nepal/everest-base-camp-trek/cover.jpg"
                            className='md:w-2/3  grow '
                        />
                        <CompanyTileCard
                            href="/company/why-ace"
                            title="Why ACE?"
                            image="/trips/nepal/everest-base-camp-trek/cover.jpg"
                            className='md:w-1/3  grow '
                        />
                    </div>

                </div>
            </div>


        </div>
    )
}

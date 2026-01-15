import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function FooterBento() {
  return (
    <>
      <section className="mb-8 relative w-full flex flex-col max-lg:items-center lg:flex-row gap-8">
        <Card className="lg:max-h-[354px] w-full lg:w-2/3 grow overflow-hidden p-2 bg-muted/30  shadow-none">
        
        </Card>
        <Card className="min-h-[300px] w-full lg:w-1/3 h-full grow">
          <CardHeader className="px-6 pt-6">
            <CardTitle className="text-3xl">Subscribe Now !</CardTitle>
            <CardDescription className="font-semibold">
              Get travel tips, exclusive offers, and the latest updates on our
              adventures. We also keep you informed about new blog posts,
              guides, and special promotions.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-6 pb-6"></CardContent>
        </Card>
      </section>
      <section className="mb-8 relative w-full flex flex-col max-lg:items-center lg:flex-row gap-8">
        <Card className="min-h-[300px] w-full lg:w-1/3 h-full grow">
          <CardHeader className="px-6 pt-6">
            <CardTitle className="text-3xl">Subscribe Now !</CardTitle>
            <CardDescription className="font-semibold">
              Get travel tips, exclusive offers, and the latest updates on our
              adventures. We also keep you informed about new blog posts,
              guides, and special promotions.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-6 pb-6"></CardContent>
        </Card>
        <Card className="lg:max-h-[354px] w-full lg:w-2/3 grow overflow-hidden p-2 bg-muted/30  shadow-none"></Card>
      </section>
    </>
  );
}

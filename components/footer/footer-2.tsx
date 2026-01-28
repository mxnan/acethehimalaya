import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { NewsletterForm } from "./newsletter-form";
import { Icons } from "../brand";
import { TripadvisorReviewsSection } from "../reviews/tripadvisor-reviews-section";
import { GoogleReviewsSection } from "../reviews/google-reviews-section";
import { Separator } from "../ui/separator";

export default function FooterTwo() {
  return (
    <>
      <Separator className="my-8" />
      <div className="my-8 min-h-[300px] w-full h-full ">
        <TripadvisorReviewsSection
          reviews={[
            {
              author: "Michael S",
              rating: 5,
              text: "Everest Base Camp trek was flawless. The guides were professional and the accommodations were comfortable. Highly recommend!",
            },
            {
              author: "Sarah L",
              rating: 5,
              text: "Amazing experience! The team at Ace the Himalaya took care of everything. The views were breathtaking and the cultural insights were invaluable.",
            },
            {
              author: "David W",
              rating: 5,
              text: "Best decision ever! The trek was well-organized from start to finish. The guides were knowledgeable and safety was prioritized throughout.",
            },
            {
              author: "Jennifer M",
              rating: 5,
              text: "Incredible journey to Everest Base Camp. The accommodation was better than expected and the food was delicious. Worth every penny!",
            },
            {
              author: "Robert K",
              rating: 5,
              text: "Outstanding service from Ace the Himalaya. Professional guides, excellent logistics, and unforgettable memories. Will definitely return!",
            },
            {
              author: "Emma T",
              rating: 5,
              text: "The Everest Base Camp trek exceeded all expectations. The team was supportive, the route was perfect, and the views were spectacular.",
            },
            {
              author: "Thomas B",
              rating: 5,
              text: "Exceptional experience! The guides were patient and knowledgeable, the accommodations were clean, and the organization was flawless.",
            },
            {
              author: "Lisa C",
              rating: 5,
              text: "Life-changing adventure! Ace the Himalaya made everything seamless. The cultural immersion and natural beauty were incredible.",
            },
            {
              author: "Mark D",
              rating: 5,
              text: "Top-notch trekking company. Professional, reliable, and passionate about providing authentic experiences. The Everest trek was amazing!",
            },
            {
              author: "Anna P",
              rating: 5,
              text: "Absolutely fantastic! The guides were amazing, the accommodations comfortable, and the journey to Base Camp was everything I dreamed of.",
            },
            {
              author: "James H",
              rating: 5,
              text: "Outstanding trek experience. Ace the Himalaya's attention to detail and commitment to safety made this journey unforgettable.",
            },
            {
              author: "Maria S",
              rating: 5,
              text: "Brilliant organization and wonderful guides. The Everest Base Camp trek was challenging but incredibly rewarding. Highly recommended!",
            },
            {
              author: "Chris R",
              rating: 5,
              text: "Exceptional service from start to finish. The team went above and beyond to ensure we had an amazing experience reaching Base Camp.",
            },
            {
              author: "Sophie L",
              rating: 5,
              text: "Incredible adventure! The guides were professional, the accommodations suitable, and the views absolutely spectacular. Thank you Ace the Himalaya!",
            },
            {
              author: "Daniel F",
              rating: 5,
              text: "Life-changing experience. The trek was well-planned, the guides knowledgeable, and reaching Everest Base Camp was a dream come true.",
            },
          ]}
        />
      </div>
      <Separator className="my-8" />
      <section className="mb-8 relative w-full flex flex-col max-md:items-center md:flex-row gap-8">
        <Card className="min-h-[300px] w-full md:w-1/3 grow">
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

        <Card className="lg:max-h-[354px] w-full md:w-2/3 grow overflow-hidden shadow-none p-2 border-none bg-primary-background">
          <Icons.brandlogo className="w-full h-full" />
        </Card>
      </section>
      <Separator className="my-8" />
      <div className="my-8 min-h-[300px] w-full h-full ">
        <GoogleReviewsSection
          reviews={[
            {
              author: "Emily R",
              rating: 5,
              text: "Ace the Himalaya handled everything perfectly. From airport pickup to Base Camp, everything was seamless. The guides were amazing!",
              avatar: "/avatars/emily.jpg",
            },
            {
              author: "James K",
              rating: 5,
              text: "Best trekking experience in Nepal. The team was professional, the accommodations comfortable, and the views breathtaking.",
            },
            {
              author: "Priya M",
              rating: 5,
              text: "Absolutely wonderful experience! The guides were knowledgeable and patient. Reaching Everest Base Camp was magical.",
              avatar: "/avatars/priya.jpg",
            },
            {
              author: "Carlos D",
              rating: 5,
              text: "Exceptional service and organization. The trek was challenging but incredibly rewarding. Highly recommend Ace the Himalaya!",
            },
            {
              author: "Nina W",
              rating: 5,
              text: "Life-changing adventure! The team took care of every detail. The cultural experiences and mountain views were unforgettable.",
              avatar: "/avatars/nina.jpg",
            },
            {
              author: "Alex T",
              rating: 5,
              text: "Outstanding trekking company. Professional guides, excellent safety measures, and amazing accommodations throughout the journey.",
            },
            {
              author: "Rachel G",
              rating: 5,
              text: "Incredible experience reaching Everest Base Camp. The organization was flawless and the guides were incredibly supportive.",
              avatar: "/avatars/rachel.jpg",
            },
            {
              author: "Tom H",
              rating: 5,
              text: "Best investment ever! The trek was perfectly organized, the food was great, and the views were spectacular. Thank you Ace the Himalaya!",
            },
            {
              author: "Maya P",
              rating: 5,
              text: "Amazing team and incredible journey. The guides were professional, the accommodations clean, and the experience life-changing.",
              avatar: "/avatars/maya.jpg",
            },
            {
              author: "Lucas M",
              rating: 5,
              text: "Exceptional service from Ace the Himalaya. The trek was well-planned, safe, and the cultural insights were invaluable.",
            },
            {
              author: "Sophia L",
              rating: 5,
              text: "Wonderful experience! The team was attentive to our needs, the guides knowledgeable, and reaching Base Camp was everything we hoped for.",
              avatar: "/avatars/sophia.jpg",
            },
            {
              author: "Oliver B",
              rating: 5,
              text: "Outstanding trekking experience. Professional organization, amazing guides, and unforgettable views of Everest.",
            },
            {
              author: "Isabella R",
              rating: 5,
              text: "Incredible journey with Ace the Himalaya. The team was professional, the accommodations comfortable, and the adventure unforgettable.",
              avatar: "/avatars/isabella.jpg",
            },
            {
              author: "Ethan W",
              rating: 5,
              text: "Best trekking company in Nepal! The organization was flawless, the guides exceptional, and the Base Camp experience magical.",
            },
            {
              author: "Zoe C",
              rating: 5,
              text: "Amazing adventure! Ace the Himalaya made everything perfect. The cultural immersion and mountain majesty were incredible.",
              avatar: "/avatars/zoe.jpg",
            },
          ]}
        />
      </div>
      <Separator className="my-8" />
    </>
  );
}

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../mdx/accordion";
import { Callout } from "../mdx/callout";
import { Separator } from "../ui/separator";

export default function FAQSection() {
  return (
    <div className="relative flex-1 w-full py-24">
      <div className="px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Frequently Asked Questions by Travelers
          </h2>
          <Separator className="my-4 max-w-2xl" />
          {/* <p className="text-sm sm:text-lg text-muted-foreground">
            Unveiling Hidden Wonders: Nepal, Bhutan, Tibet, and Beyond - Inspire
            Your Journey!
          </p> */}
        </div>
        <Accordion type="single" collapsible className="mt-8 max-w-2xl mx-auto w-full py-2">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              Why Trek with ACE The Himalaya ?
            </AccordionTrigger>
            <AccordionContent>
              Ace the Himalaya is widely regarded as one of the best trekking and travel companies in Nepal due to its expert local guides, high safety standards, well-designed trekking packages, and consistent service quality since 2006. With operations based in Kathmandu and across the world with our representatives, we deliver reliable, professionally managed trekking and travel experiences.
              <Callout type="note">
                Here are 17 reasons why you should choose Ace the Himalaya for your next adventure!
              </Callout>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Why do travelers rate Ace the Himalaya so highly on TripAdvisor ?
            </AccordionTrigger>
            <AccordionContent>
              Travelers consistently rate Ace the Himalaya highly on TripAdvisor for our knowledgeable guides, excellent trip organization, safety-first approach, and responsive customer service. Our strong review record reflects genuine traveler satisfaction and trust earned through years of successful Himalayan treks and tours.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              What trekking packages does Ace the Himalaya offer in Nepal ?
            </AccordionTrigger>
            <AccordionContent>
              Ace the Himalaya offers a wide range of trekking packages in Nepal, including Everest Base Camp, Annapurna region treks, Manaslu Circuit, Langtang Valley, and off-the-beaten-path routes. We also provide cultural tours, luxury treks, and customizable private itineraries for different experience levels.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              How does Ace the Himalaya ensure safe and sustainable trekking experiences ?
            </AccordionTrigger>
            <AccordionContent>
              We ensure safe and sustainable trekking experiences through trained and licensed local guides, proper acclimatization schedules, strict safety protocols, and responsible tourism practices. As a Travelife certified travel company in Nepal, we actively support local communities while minimizing environmental impact across all our trekking routes.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>
              Can you recommend the best trek in Nepal based on my fitness and interests ?
            </AccordionTrigger>
            <AccordionContent>
              Our experts help you choose the best trek in Nepal based on your fitness level, trekking experience, travel duration, and personal interests.
              We carefully consider factors such as altitude, trail difficulty, accommodation comfort, and seasonal conditions to recommend the most suitable trekking route.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger>
              Are your trekking packages suitable for beginners as well as experienced trekkers ?
            </AccordionTrigger>
            <AccordionContent>
              Yes, our trekking packages in Nepal are designed for beginners, intermediate hikers, and experienced trekkers alike. Proper acclimatization, pacing, and guide support ensure a safe and enjoyable experience for all levels.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-7">
            <AccordionTrigger>
              Can I customize a private trek or tour itinerary with Ace ?
            </AccordionTrigger>
            <AccordionContent>
              You can definitely customize a private journey in the Himalaya. We specialize in customized private trekking and tour itineraries tailored to your schedule, fitness level, and travel preferences. Our experts handle every detail from planning to execution.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-8">
            <AccordionTrigger>
              Do you provide cultural tours, short hikes, and sightseeing experiences in Nepal, Bhutan and Tibet ?
            </AccordionTrigger>
            <AccordionContent>
              Yes, we provide a wide range of cultural tours, short hikes, and sightseeing experiences across Nepal, Bhutan, and Tibet. These include heritage city tours, monastery visits, village walks, nature hikes, and scenic day excursions, ideal for travelers seeking softer adventures and deeper cultural immersion.

              Our itineraries are led by knowledgeable local guides and can be enjoyed as standalone trips or combined with longer treks and tours.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-9">
            <AccordionTrigger>
              What kind of physical training is necessary for trek preparation ?
            </AccordionTrigger>
            <AccordionContent>
              For trekking, you must prepare your body to walk over uneven, hilly landscapes while carrying a backpack. Walking at an incline, jogging, cycling, and going for long-distance hikes are all good ways to exercise. You should work out for at least one hour four to five times a week for at least two months before trekking.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-10">
            <AccordionTrigger>
              Where can I exchange money upon arrival in Nepal ?
            </AccordionTrigger>
            <AccordionContent>
              You can exchange currency at one of the money exchange counters in the arrivals area of Tribhuvan International Airport, which operate 24 hours a day. Alternatively, you can also exchange money at authorized exchange centers near your hotel, which are typically open during the day.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-11">
            <AccordionTrigger>
              What is your cancellation policy ?
            </AccordionTrigger>
            <AccordionContent>
              Notice should be provided 20 days before the trip start date in case of cancellation. The trip can be canceled for justifiable reasons. Once the trip is canceled, a fee of 30% of the trip cost is retained for administrative costs.

              However, the trip amount is entirely non-refundable if the cancellation is not made before the 20 days as per our terms and conditions. For submitting a claim to your insurance company after the cancellation, we can assist with documentation such as a receipt of monies paid. Refund will not be provided for unused accommodation in case of trip cancellation caused by personal reasons/sickness/weather.

              More information about our cancellation policy can be found here in Terms and Conditions page.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

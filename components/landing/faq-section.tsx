import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../mdx/accordion";
import Image from "next/image";
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
              **Day 01:** Arrival at Tribhuvan International Airport in
              Kathmandu and transfer to hotel
            </AccordionTrigger>
            <AccordionContent>
              Upon your arrival at Tribhuvan International Airport in Kathmandu,
              one of our representatives will warmly welcome you. You’ll be
              escorted to your hotel in our private tourist vehicle.
              <figure className="my-4">
                <Image
                  loading="lazy"
                  width={800}
                  height={600}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
                  src={"/trips/nepal/everest-base-camp-trek/day1.jpg"}
                  alt={"Arrival at Tribhuvan International Airport"}
                  className="w-min h-54 md:h-72 object-cover rounded-md shadow-sm"
                />
                <figcaption className="text-muted-foreground text-sm mt-4">
                  Arrival at Tribhuvan International Airport
                </figcaption>
              </figure>
              During the pre-trip meeting, you’ll have the opportunity to meet
              your trip guide and address any questions or concerns you may have
              about your upcoming mountain trekking adventure with one of our
              team members.
              {/* <TripDetailsCard
              variant="info-only"
              className="my-4"
              altitude="Kathmandu (1,400 m / 4,593 ft)"
              accommodation="Overnight in Kathmandu"
              meals="Meals not included"
            /> */}
              <Callout type="note">
                **Note:** The pre-trip meeting will be held either at our office
                or at your hotel, depending on your arrival time and group size.
                Please be sure to bring a passport-sized photo, a readable copy
                of your travel insurance policy, and your original passport to
                the meeting. These documents are required to obtain trekking
                permits and complete related documentation for the trek.
                Additionally, settle the remaining balance of your invoice and
                sign the legally binding trip form and non-liability disclaimer.
              </Callout>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              **Day 01:** Arrival at Tribhuvan International Airport in
              Kathmandu and transfer to hotel
            </AccordionTrigger>
            <AccordionContent>
              Upon your arrival at Tribhuvan International Airport in Kathmandu,
              one of our representatives will warmly welcome you. You’ll be
              escorted to your hotel in our private tourist vehicle.
              <figure className="my-4">
                <Image
                  loading="lazy"
                  width={800}
                  height={600}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
                  src={"/trips/nepal/everest-base-camp-trek/day1.jpg"}
                  alt={"Arrival at Tribhuvan International Airport"}
                  className="w-min h-54 md:h-72 object-cover rounded-md shadow-sm"
                />
                <figcaption className="text-muted-foreground text-sm mt-4">
                  Arrival at Tribhuvan International Airport
                </figcaption>
              </figure>
              During the pre-trip meeting, you’ll have the opportunity to meet
              your trip guide and address any questions or concerns you may have
              about your upcoming mountain trekking adventure with one of our
              team members.
              {/* <TripDetailsCard
              variant="info-only"
              className="my-4"
              altitude="Kathmandu (1,400 m / 4,593 ft)"
              accommodation="Overnight in Kathmandu"
              meals="Meals not included"
            /> */}
              <Callout type="note">
                **Note:** The pre-trip meeting will be held either at our office
                or at your hotel, depending on your arrival time and group size.
                Please be sure to bring a passport-sized photo, a readable copy
                of your travel insurance policy, and your original passport to
                the meeting. These documents are required to obtain trekking
                permits and complete related documentation for the trek.
                Additionally, settle the remaining balance of your invoice and
                sign the legally binding trip form and non-liability disclaimer.
              </Callout>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              **Day 01:** Arrival at Tribhuvan International Airport in
              Kathmandu and transfer to hotel
            </AccordionTrigger>
            <AccordionContent>
              Upon your arrival at Tribhuvan International Airport in Kathmandu,
              one of our representatives will warmly welcome you. You’ll be
              escorted to your hotel in our private tourist vehicle.
              <figure className="my-4">
                <Image
                  loading="lazy"
                  width={800}
                  height={600}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
                  src={"/trips/nepal/everest-base-camp-trek/day1.jpg"}
                  alt={"Arrival at Tribhuvan International Airport"}
                  className="w-min h-54 md:h-72 object-cover rounded-md shadow-sm"
                />
                <figcaption className="text-muted-foreground text-sm mt-4">
                  Arrival at Tribhuvan International Airport
                </figcaption>
              </figure>
              During the pre-trip meeting, you’ll have the opportunity to meet
              your trip guide and address any questions or concerns you may have
              about your upcoming mountain trekking adventure with one of our
              team members.
              {/* <TripDetailsCard
              variant="info-only"
              className="my-4"
              altitude="Kathmandu (1,400 m / 4,593 ft)"
              accommodation="Overnight in Kathmandu"
              meals="Meals not included"
            /> */}
              <Callout type="note">
                **Note:** The pre-trip meeting will be held either at our office
                or at your hotel, depending on your arrival time and group size.
                Please be sure to bring a passport-sized photo, a readable copy
                of your travel insurance policy, and your original passport to
                the meeting. These documents are required to obtain trekking
                permits and complete related documentation for the trek.
                Additionally, settle the remaining balance of your invoice and
                sign the legally binding trip form and non-liability disclaimer.
              </Callout>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              **Day 01:** Arrival at Tribhuvan International Airport in
              Kathmandu and transfer to hotel
            </AccordionTrigger>
            <AccordionContent>
              Upon your arrival at Tribhuvan International Airport in Kathmandu,
              one of our representatives will warmly welcome you. You’ll be
              escorted to your hotel in our private tourist vehicle.
              <figure className="my-4">
                <Image
                  loading="lazy"
                  width={800}
                  height={600}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
                  src={"/trips/nepal/everest-base-camp-trek/day1.jpg"}
                  alt={"Arrival at Tribhuvan International Airport"}
                  className="w-min h-54 md:h-72 object-cover rounded-md shadow-sm"
                />
                <figcaption className="text-muted-foreground text-sm mt-4">
                  Arrival at Tribhuvan International Airport
                </figcaption>
              </figure>
              During the pre-trip meeting, you’ll have the opportunity to meet
              your trip guide and address any questions or concerns you may have
              about your upcoming mountain trekking adventure with one of our
              team members.
              {/* <TripDetailsCard
              variant="info-only"
              className="my-4"
              altitude="Kathmandu (1,400 m / 4,593 ft)"
              accommodation="Overnight in Kathmandu"
              meals="Meals not included"
            /> */}
              <Callout type="note">
                **Note:** The pre-trip meeting will be held either at our office
                or at your hotel, depending on your arrival time and group size.
                Please be sure to bring a passport-sized photo, a readable copy
                of your travel insurance policy, and your original passport to
                the meeting. These documents are required to obtain trekking
                permits and complete related documentation for the trek.
                Additionally, settle the remaining balance of your invoice and
                sign the legally binding trip form and non-liability disclaimer.
              </Callout>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>
              **Day 01:** Arrival at Tribhuvan International Airport in
              Kathmandu and transfer to hotel
            </AccordionTrigger>
            <AccordionContent>
              Upon your arrival at Tribhuvan International Airport in Kathmandu,
              one of our representatives will warmly welcome you. You’ll be
              escorted to your hotel in our private tourist vehicle.
              <figure className="my-4">
                <Image
                  loading="lazy"
                  width={800}
                  height={600}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
                  src={"/trips/nepal/everest-base-camp-trek/day1.jpg"}
                  alt={"Arrival at Tribhuvan International Airport"}
                  className="w-min h-54 md:h-72 object-cover rounded-md shadow-sm"
                />
                <figcaption className="text-muted-foreground text-sm mt-4">
                  Arrival at Tribhuvan International Airport
                </figcaption>
              </figure>
              During the pre-trip meeting, you’ll have the opportunity to meet
              your trip guide and address any questions or concerns you may have
              about your upcoming mountain trekking adventure with one of our
              team members.
              {/* <TripDetailsCard
              variant="info-only"
              className="my-4"
              altitude="Kathmandu (1,400 m / 4,593 ft)"
              accommodation="Overnight in Kathmandu"
              meals="Meals not included"
            /> */}
              <Callout type="note">
                **Note:** The pre-trip meeting will be held either at our office
                or at your hotel, depending on your arrival time and group size.
                Please be sure to bring a passport-sized photo, a readable copy
                of your travel insurance policy, and your original passport to
                the meeting. These documents are required to obtain trekking
                permits and complete related documentation for the trek.
                Additionally, settle the remaining balance of your invoice and
                sign the legally binding trip form and non-liability disclaimer.
              </Callout>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger>
              **Day 01:** Arrival at Tribhuvan International Airport in
              Kathmandu and transfer to hotel
            </AccordionTrigger>
            <AccordionContent>
              Upon your arrival at Tribhuvan International Airport in Kathmandu,
              one of our representatives will warmly welcome you. You’ll be
              escorted to your hotel in our private tourist vehicle.
              <figure className="my-4">
                <Image
                  loading="lazy"
                  width={800}
                  height={600}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
                  src={"/trips/nepal/everest-base-camp-trek/day1.jpg"}
                  alt={"Arrival at Tribhuvan International Airport"}
                  className="w-min h-54 md:h-72 object-cover rounded-md shadow-sm"
                />
                <figcaption className="text-muted-foreground text-sm mt-4">
                  Arrival at Tribhuvan International Airport
                </figcaption>
              </figure>
              During the pre-trip meeting, you’ll have the opportunity to meet
              your trip guide and address any questions or concerns you may have
              about your upcoming mountain trekking adventure with one of our
              team members.
              {/* <TripDetailsCard
              variant="info-only"
              className="my-4"
              altitude="Kathmandu (1,400 m / 4,593 ft)"
              accommodation="Overnight in Kathmandu"
              meals="Meals not included"
            /> */}
              <Callout type="note">
                **Note:** The pre-trip meeting will be held either at our office
                or at your hotel, depending on your arrival time and group size.
                Please be sure to bring a passport-sized photo, a readable copy
                of your travel insurance policy, and your original passport to
                the meeting. These documents are required to obtain trekking
                permits and complete related documentation for the trek.
                Additionally, settle the remaining balance of your invoice and
                sign the legally binding trip form and non-liability disclaimer.
              </Callout>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-7">
            <AccordionTrigger>
              **Day 01:** Arrival at Tribhuvan International Airport in
              Kathmandu and transfer to hotel
            </AccordionTrigger>
            <AccordionContent>
              Upon your arrival at Tribhuvan International Airport in Kathmandu,
              one of our representatives will warmly welcome you. You’ll be
              escorted to your hotel in our private tourist vehicle.
              <figure className="my-4">
                <Image
                  loading="lazy"
                  width={800}
                  height={600}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
                  src={"/trips/nepal/everest-base-camp-trek/day1.jpg"}
                  alt={"Arrival at Tribhuvan International Airport"}
                  className="w-min h-54 md:h-72 object-cover rounded-md shadow-sm"
                />
                <figcaption className="text-muted-foreground text-sm mt-4">
                  Arrival at Tribhuvan International Airport
                </figcaption>
              </figure>
              During the pre-trip meeting, you’ll have the opportunity to meet
              your trip guide and address any questions or concerns you may have
              about your upcoming mountain trekking adventure with one of our
              team members.
              {/* <TripDetailsCard
              variant="info-only"
              className="my-4"
              altitude="Kathmandu (1,400 m / 4,593 ft)"
              accommodation="Overnight in Kathmandu"
              meals="Meals not included"
            /> */}
              <Callout type="note">
                **Note:** The pre-trip meeting will be held either at our office
                or at your hotel, depending on your arrival time and group size.
                Please be sure to bring a passport-sized photo, a readable copy
                of your travel insurance policy, and your original passport to
                the meeting. These documents are required to obtain trekking
                permits and complete related documentation for the trek.
                Additionally, settle the remaining balance of your invoice and
                sign the legally binding trip form and non-liability disclaimer.
              </Callout>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-8">
            <AccordionTrigger>
              **Day 01:** Arrival at Tribhuvan International Airport in
              Kathmandu and transfer to hotel
            </AccordionTrigger>
            <AccordionContent>
              Upon your arrival at Tribhuvan International Airport in Kathmandu,
              one of our representatives will warmly welcome you. You’ll be
              escorted to your hotel in our private tourist vehicle.
              <figure className="my-4">
                <Image
                  loading="lazy"
                  width={800}
                  height={600}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
                  src={"/trips/nepal/everest-base-camp-trek/day1.jpg"}
                  alt={"Arrival at Tribhuvan International Airport"}
                  className="w-min h-54 md:h-72 object-cover rounded-md shadow-sm"
                />
                <figcaption className="text-muted-foreground text-sm mt-4">
                  Arrival at Tribhuvan International Airport
                </figcaption>
              </figure>
              During the pre-trip meeting, you’ll have the opportunity to meet
              your trip guide and address any questions or concerns you may have
              about your upcoming mountain trekking adventure with one of our
              team members.
              {/* <TripDetailsCard
              variant="info-only"
              className="my-4"
              altitude="Kathmandu (1,400 m / 4,593 ft)"
              accommodation="Overnight in Kathmandu"
              meals="Meals not included"
            /> */}
              <Callout type="note">
                **Note:** The pre-trip meeting will be held either at our office
                or at your hotel, depending on your arrival time and group size.
                Please be sure to bring a passport-sized photo, a readable copy
                of your travel insurance policy, and your original passport to
                the meeting. These documents are required to obtain trekking
                permits and complete related documentation for the trek.
                Additionally, settle the remaining balance of your invoice and
                sign the legally binding trip form and non-liability disclaimer.
              </Callout>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-9">
            <AccordionTrigger>
              **Day 01:** Arrival at Tribhuvan International Airport in
              Kathmandu and transfer to hotel
            </AccordionTrigger>
            <AccordionContent>
              Upon your arrival at Tribhuvan International Airport in Kathmandu,
              one of our representatives will warmly welcome you. You’ll be
              escorted to your hotel in our private tourist vehicle.
              <figure className="my-4">
                <Image
                  loading="lazy"
                  width={800}
                  height={600}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
                  src={"/trips/nepal/everest-base-camp-trek/day1.jpg"}
                  alt={"Arrival at Tribhuvan International Airport"}
                  className="w-min h-54 md:h-72 object-cover rounded-md shadow-sm"
                />
                <figcaption className="text-muted-foreground text-sm mt-4">
                  Arrival at Tribhuvan International Airport
                </figcaption>
              </figure>
              During the pre-trip meeting, you’ll have the opportunity to meet
              your trip guide and address any questions or concerns you may have
              about your upcoming mountain trekking adventure with one of our
              team members.
              {/* <TripDetailsCard
              variant="info-only"
              className="my-4"
              altitude="Kathmandu (1,400 m / 4,593 ft)"
              accommodation="Overnight in Kathmandu"
              meals="Meals not included"
            /> */}
              <Callout type="note">
                **Note:** The pre-trip meeting will be held either at our office
                or at your hotel, depending on your arrival time and group size.
                Please be sure to bring a passport-sized photo, a readable copy
                of your travel insurance policy, and your original passport to
                the meeting. These documents are required to obtain trekking
                permits and complete related documentation for the trek.
                Additionally, settle the remaining balance of your invoice and
                sign the legally binding trip form and non-liability disclaimer.
              </Callout>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-10">
            <AccordionTrigger>
              **Day 01:** Arrival at Tribhuvan International Airport in
              Kathmandu and transfer to hotel
            </AccordionTrigger>
            <AccordionContent>
              Upon your arrival at Tribhuvan International Airport in Kathmandu,
              one of our representatives will warmly welcome you. You’ll be
              escorted to your hotel in our private tourist vehicle.
              <figure className="my-4">
                <Image
                  loading="lazy"
                  width={800}
                  height={600}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
                  src={"/trips/nepal/everest-base-camp-trek/day1.jpg"}
                  alt={"Arrival at Tribhuvan International Airport"}
                  className="w-min h-54 md:h-72 object-cover rounded-md shadow-sm"
                />
                <figcaption className="text-muted-foreground text-sm mt-4">
                  Arrival at Tribhuvan International Airport
                </figcaption>
              </figure>
              During the pre-trip meeting, you’ll have the opportunity to meet
              your trip guide and address any questions or concerns you may have
              about your upcoming mountain trekking adventure with one of our
              team members.
              {/* <TripDetailsCard
              variant="info-only"
              className="my-4"
              altitude="Kathmandu (1,400 m / 4,593 ft)"
              accommodation="Overnight in Kathmandu"
              meals="Meals not included"
            /> */}
              <Callout type="note">
                **Note:** The pre-trip meeting will be held either at our office
                or at your hotel, depending on your arrival time and group size.
                Please be sure to bring a passport-sized photo, a readable copy
                of your travel insurance policy, and your original passport to
                the meeting. These documents are required to obtain trekking
                permits and complete related documentation for the trek.
                Additionally, settle the remaining balance of your invoice and
                sign the legally binding trip form and non-liability disclaimer.
              </Callout>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

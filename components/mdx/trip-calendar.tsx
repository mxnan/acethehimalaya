"use client";

import * as React from "react";
import {
  addDays,
  addYears,
  endOfMonth,
  startOfToday,
  isBefore,
} from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import type { DateRange } from "react-day-picker";

/* -------------------------------------------------------------------------- */
/* Props                                                                      */
/* -------------------------------------------------------------------------- */

type TripCalendarProps = {
  totalDays: number;
  startDate?: Date;
  numberOfMonths?: number;
  className?: string;
};

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function TripCalendar({
  totalDays,
  startDate,
  numberOfMonths = 2,
  className,
}: TripCalendarProps) {
  const today = startOfToday();

  // ✅ limit calendar to 1 year ahead (end of that month)
  const maxDate = endOfMonth(addYears(today, 1));

  const initialFrom =
    startDate && !isBefore(startDate, today) ? startDate : today;

  const [range, setRange] = React.useState<DateRange>({
    from: initialFrom,
    to: addDays(initialFrom, totalDays - 1),
  });

  return (
    <Calendar
      mode="single"
      selected={range.from}
      defaultMonth={range.from}
      numberOfMonths={numberOfMonths}
      fromDate={today}      // 🚫 disables past dates
      toDate={maxDate}      // 🚫 disables dates beyond 1 year
      onSelect={(selectedDate) => {
        if (!selectedDate) return;
        if (isBefore(selectedDate, today)) return;

        setRange({
          from: selectedDate,
          to: addDays(selectedDate, totalDays - 1),
        });
      }}
      modifiers={{
        range_start: range.from,
        range_end: range.to,
        range_middle: (date) =>
          range.from && range.to
            ? date > range.from && date < range.to
            : false,
      }}
      modifiersClassNames={{
        range_start: "rdp-range_start",
        range_end: "rdp-range_end",
        range_middle: "rdp-range_middle",
      }}
      className={cn("rounded-lg border shadow-sm bg-muted-foreground/20", className)}
    />
  );
}

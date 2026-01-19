"use client";

import * as React from "react";
import { type DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";

export default function CalendarCard() {
  // Use useState with a function to avoid hydration mismatch
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(() => ({
    from: new Date(2025, 5, 12), // June 12, 2025
    to: new Date(2025, 6, 15),   // July 15, 2025
  }));

  return (
    <Calendar
      mode="range"
      defaultMonth={dateRange?.from}
      selected={dateRange}
      onSelect={setDateRange}
      numberOfMonths={2}
      className="rounded-lg border shadow-sm"
    />
  );
}
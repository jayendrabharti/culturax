"use client";

import { formatTimestamp } from "@/utils/utils";
import { useEffect, useState } from "react";

export default function TimestampDisplay({
  timestamp,
  format = 1,
}: {
  timestamp: Date;
  format?: 1 | 2;
}) {
  const [formattedTime, setFormattedTime] = useState<string | null>(null);

  useEffect(() => {
    setFormattedTime(formatTimestamp(timestamp, format) || "");
  }, [timestamp, format]);

  if (!formattedTime) {
    return `Loading...`;
  }

  return formattedTime;
}

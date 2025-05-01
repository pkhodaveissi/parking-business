import { getRate } from "@/utils/revenue";
import { ParkingSession } from "../api";

export const isSuspicious = (s: ParkingSession) => {
  if (s.isSessionEnded) return false; // don't flag ended sessions

  const startedAt = new Date(s.sessionStartedAt);
  const now = new Date();
  const elapsedMinutes = (now.getTime() - startedAt.getTime()) / (1000 * 60);
  const elapsedHours = elapsedMinutes / 60;

  const priceEstimate = elapsedHours * getRate(s.parkingSpaceId);

  return elapsedHours > 8 || priceEstimate > 100;
};
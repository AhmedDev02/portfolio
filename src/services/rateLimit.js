// src/services/rateLimit.js

import { COOLDOWN_HOURS } from "../utils/constants";

export function checkCooldown(existingRecord) {
  if (!existingRecord) return { allowed: true };

  const now = new Date();
  const last = new Date(existingRecord.last_sent);

  const diffHours = (now - last) / (1000 * 60 * 60);

  if (diffHours < COOLDOWN_HOURS) {
    return {
      allowed: false,
      hoursLeft: Math.ceil(COOLDOWN_HOURS - diffHours),
    };
  }

  return { allowed: true };
}

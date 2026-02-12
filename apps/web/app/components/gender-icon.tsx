import { MarsIcon, VenusIcon } from "lucide-react";

export type Gender = "male" | "female";

export function GenderIcon({ gender }: { gender: Gender }) {
  if (gender === "male") {
    return <MarsIcon className="size-3.5 text-blue-500" />;
  }
  return <VenusIcon className="size-3.5 text-pink-500" />;
}

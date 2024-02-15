import { PalType } from "@/types/palTypes";

export async function getPals() {
  const response = await fetch(
    "https://raw.githubusercontent.com/mlg404/palworld-paldex-api/main/src/pals.json"
  );
  const pals = await response.json();
  return pals as PalType[];
}

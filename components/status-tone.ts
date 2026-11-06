import { statuses, type StatusId } from "@/data/mods";

export const statusTone: Record<StatusId, string> = {
  udgivet: "bg-primary text-primary-foreground",
  beta: "bg-[oklch(0.72_0.12_85)] text-[oklch(0.28_0.04_48)]",
  prototype: "bg-[oklch(0.55_0.08_200)] text-white",
  kildekode: "border-border bg-transparent text-foreground",
  foraeldet: "bg-destructive/15 text-destructive",
  discord: "bg-secondary text-secondary-foreground",
};

export function statusLabel(id: StatusId) {
  return statuses.find((status) => status.id === id)?.label ?? id;
}

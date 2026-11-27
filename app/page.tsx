import { Catalog } from "@/components/catalog";
import { loadLiveVersions } from "@/lib/live-versions";

export const revalidate = 21600;

export default async function HomePage() {
  const liveVersions = await loadLiveVersions();
  return <Catalog liveVersions={liveVersions} />;
}

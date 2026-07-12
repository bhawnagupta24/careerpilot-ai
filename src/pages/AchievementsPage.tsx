import { PageHeader } from "@/components/layout/PageHeader";
import { AchievementBadge } from "@/components/dashboard/AchievementBadge";
import { CardSkeleton } from "@/components/ui/Skeleton";
import { useAchievements } from "@/hooks/useAchievements";

export function AchievementsPage() {
  const { data, isLoading } = useAchievements();

  const all = [...(data?.unlocked ?? []), ...(data?.locked ?? [])];

  return (
    <div>
      <PageHeader
        title="Achievements"
        description={`${data?.totalUnlocked ?? 0} of ${data?.totalAvailable ?? 0} unlocked — keep flying.`}
      />

      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {all.map((a, i) => (
            <AchievementBadge key={a.badgeKey} achievement={a} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

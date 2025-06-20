import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCard = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[225px] w-[350px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};

export default SkeletonCard;

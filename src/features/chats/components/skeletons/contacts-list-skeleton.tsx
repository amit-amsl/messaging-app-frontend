export default function ContactsListSkeleton() {
  return (
    <div className="flex flex-col gap-6 p-4">
      {Array.from({ length: 7 }).map((_val, idx) => (
        <div key={idx} className="flex gap-4 items-center">
          <div className="skeleton h-12 w-12 animate-pulse shrink-0 rounded-full"></div>
          <div className="space-y-2">
            <div className="skeleton h-4 w-24 animate-pulse"></div>
            <div className="skeleton h-4 w-48 animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

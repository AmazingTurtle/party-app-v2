export function CardTemplate1() {
  return (
    <div className="flex items-center space-x-2">
      <div className="h-4 w-4 rounded-full bg-red-700/50 lg:h-8 lg:w-8" />
      <span className="text-xs lg:text-base">or</span>
      <div className="h-4 w-4 rounded-full bg-black/50 lg:h-8 lg:w-8" />
    </div>
  );
}

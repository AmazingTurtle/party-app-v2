export function CardTemplate4() {
  return (
    <div className="grid grid-cols-2 items-center gap-2 opacity-50 lg:flex lg:space-x-2">
      <svg viewBox="0 0 64 64" className="h-6 w-6 lg:h-10 lg:w-10">
        <use href={`#suit-c`} />
      </svg>
      <svg viewBox="0 0 64 64" className="h-5 w-5 lg:h-10 lg:w-10">
        <use href={`#suit-d`} fill="#d40000" />
      </svg>
      <svg viewBox="0 0 64 64" className="h-5 w-5 lg:h-10 lg:w-10">
        <use href={`#suit-h`} fill="#d40000" />
      </svg>
      <svg viewBox="0 0 64 64" className="h-5 w-5 lg:h-10 lg:w-10">
        <use href={`#suit-s`} />
      </svg>
    </div>
  );
}

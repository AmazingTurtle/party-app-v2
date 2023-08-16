export function CardTemplate4() {
  return (
    <div className="grid grid-cols-2 gap-2 lg:flex items-center lg:space-x-2 opacity-50">
      <svg viewBox="0 0 64 64" className="w-6 h-6 lg:w-10 lg:h-10">
        <use href={`#suit-c`} />
      </svg>
      <svg viewBox="0 0 64 64" className="w-5 h-5 lg:w-10 lg:h-10">
        <use href={`#suit-d`} fill="#d40000" />
      </svg>
      <svg viewBox="0 0 64 64" className="w-5 h-5 lg:w-10 lg:h-10">
        <use href={`#suit-h`} fill="#d40000" />
      </svg>
      <svg viewBox="0 0 64 64" className="w-5 h-5 lg:w-10 lg:h-10">
        <use href={`#suit-s`} />
      </svg>
    </div>
  );
}

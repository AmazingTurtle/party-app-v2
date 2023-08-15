export function classNames(
  ...classes: Array<string | undefined | boolean>
): string {
  return classes.filter(Boolean).join(' ');
}

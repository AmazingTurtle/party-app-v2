import { type ReactNode } from 'react';

export default function IndexLayout({ children }: { children: ReactNode }) {
  return <main className="index-main">{children}</main>;
}

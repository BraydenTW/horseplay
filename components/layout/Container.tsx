import { ReactNode } from "react";

export default function Container({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="p-0 min-h-full">
      {children}
    </div>
  )
}
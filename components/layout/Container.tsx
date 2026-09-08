import { ReactNode } from "react";

export default function Container({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="p-6">
      {children}
    </div>
  )
}
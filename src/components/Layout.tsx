import type { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen" style={{ background: "#F4F5F7" }}>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}

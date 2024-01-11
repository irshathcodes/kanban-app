"use client";

import Sidebar from "@/components/sidebar";

export default function Home() {
  return (
    <div className="grid grid-cols-[270px_minmax(0,1fr)] gap-6">
      <Sidebar />
      <main>hello world</main>
    </div>
  );
}

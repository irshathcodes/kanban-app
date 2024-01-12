"use client";
import { useParams } from "next/navigation";

export default function Board() {
  const { id } = useParams();
  return <div>Board {id}</div>;
}

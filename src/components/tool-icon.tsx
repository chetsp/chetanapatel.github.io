import Image from "next/image";
import { CircleCheck, Database, GitBranch, Search } from "lucide-react";
import type { Tool } from "@/data/portfolio";
export default function ToolIcon({
  tool,
  compact = false,
}: {
  tool: Tool;
  compact?: boolean;
}) {
  const ConceptIcon =
    tool.symbol === "retrieval"
      ? Search
      : tool.symbol === "checks"
        ? CircleCheck
        : tool.symbol === "schedule"
          ? GitBranch
          : Database;
  return (
    <span
      className={`tool-mark ${compact ? "tool-mark-compact" : ""} ${tool.logo ? "tool-mark-brand" : ""}`}
      aria-hidden="true"
    >
      {tool.logo ? (
        <Image
          className="tool-brand-svg"
          src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/tools/${tool.logo}.svg?v=brand-color`}
          width={28}
          height={28}
          alt=""
          unoptimized
        />
      ) : (
        <ConceptIcon size={compact ? 15 : 25} strokeWidth={1.6} />
      )}
    </span>
  );
}

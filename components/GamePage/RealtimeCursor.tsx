import HandIcon from "@/icons/HandIcon";

export default function RealtimeCursor({
  cursor,
}: {
  cursor: { x: number; y: number; user: string };
}) {
  return (
    <span
      className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-blue-100 text-blue-800 absolute"
      style={{
        top: cursor.y,
        left: cursor.x - 20,
      }}
    >
      <HandIcon />
      {cursor.user}
    </span>
  );
}

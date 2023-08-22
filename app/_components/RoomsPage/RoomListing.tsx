import { Room } from "@/types";
import { enterRoom } from "@/app/_services/api";

export default function RoomListing({ rooms }: { rooms: Room[] }) {
  const onEnter = async (roomId: number) => {
    try {
      await enterRoom(roomId);
      window.location.href = `/room/${roomId}`;
    } catch (error) {
      alert((error as Error).message);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold">Rooms Available</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th className="pl-0">Room Name</th>
              <th>Created By</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((data) => (
              <tr key={data.name}>
                <th className="pl-0">{data.name}</th>
                <td>{data.helper}</td>
                <td className="pr-0 text-end">
                  <button
                    onClick={() => onEnter(data.id)}
                    className="rounded-md btn btn-sm btn-outline"
                  >
                    Enter
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

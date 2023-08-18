import useRoom from "@/hooks/useRoom";
import useUser from "@/hooks/useUser";
import { Room } from "@/models";
import { enterRoom } from "@/services/api";

export default function RoomListing({ rooms }: { rooms: Room[] }) {
  const { userName } = useUser();
  const { setRoomId } = useRoom();

  const onEnter = async (roomId: number) => {
    try {
      await enterRoom({ guesser: userName, room_id: roomId });
      setRoomId(roomId);
    } catch (error) {
      alert((error as Error).message);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold">Rooms available</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Room Name</th>
              <th>Created By</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((data) => (
              <tr key={data.name}>
                <th>{data.name}</th>
                <td>{data.helper}</td>
                <td>
                  <button onClick={() => onEnter(data.id)} className="rounded-md btn btn-sm">
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

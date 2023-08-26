import { FormattedMessage } from "react-intl";
import { motion } from "framer-motion";
import useRooms from "@/app/_hooks/useRooms";
import EnterBtn from "./EnterBtn";

export default function RoomListing() {
  const { rooms } = useRooms();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold">
        <FormattedMessage id="rooms-available" />
      </h2>
      <div className="overflow-x-hidden overflow-y-hidden">
        <table className="table">
          <thead>
            <tr>
              <th className="pl-0">
                <FormattedMessage id="room-name" />
              </th>
              <th>
                <FormattedMessage id="createdby-label" />
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((data, index) => (
              <motion.tr
                key={data.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <th className="pl-0">{data.name}</th>
                <td>{data.created_by_name}</td>
                <td className="pr-0 text-end">
                  <EnterBtn roomId={data.id} />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

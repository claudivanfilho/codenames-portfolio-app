import { useState } from "react";
import { logout } from "../_services/api";
import Loading from "./Loading";

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);

  const onLogout = async () => {
    setLoading(true);
    await logout().finally(() => setLoading(false));
  };

  return (
    <button disabled={loading} onClick={onLogout} className="btn btn-sm btn-outline">
      {loading && <Loading />}
      Logout
    </button>
  );
}

import { useState } from "react";
import { logout } from "../_services/api";
import Loading from "./Loading";

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);

  const onLogout = async () => {
    setLoading(true);
    await logout().catch((error) => {
      setLoading(false);
      alert(error.message);
    });
  };

  return (
    <button disabled={loading} onClick={onLogout} className="btn btn-sm btn-outline">
      {loading && <Loading />}
      Logout
    </button>
  );
}

import { logout } from "../_services/api";
import LoadingButton from "./LoadingButton";

export default function LogoutButton() {
  const onLogout = async () => {
    await logout();
    window.location.href = "/login";
  };
  return (
    <LoadingButton hideOnCatch onClick={onLogout} className="btn btn-sm btn-outline">
      Logout
    </LoadingButton>
  );
}

import { logout } from "../_services/api";
import LoadingButton from "./LoadingButton";

export default function LogoutButton() {
  return (
    <LoadingButton hideOnCatch onClick={() => logout()} className="btn btn-sm btn-outline">
      Logout
    </LoadingButton>
  );
}

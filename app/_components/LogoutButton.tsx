export default function LogoutButton() {
  return (
    <form action="/auth/logout" method="post">
      <button className="btn btn-sm btn-outline">Logout</button>
    </form>
  );
}

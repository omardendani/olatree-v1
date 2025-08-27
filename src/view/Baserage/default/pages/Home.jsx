import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <p>Baserage</p>
      <Link to="/dental">dental</Link>
      <Link to="/login">Login</Link>
      <Link to="/user">User</Link>
    </div>
  )
}
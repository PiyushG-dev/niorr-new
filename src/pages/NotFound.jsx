import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="notfound">
      <h1>404</h1>
      <p>This page could not be found.</p>
      <Link to="/">← Back to home</Link>
    </div>
  );
}

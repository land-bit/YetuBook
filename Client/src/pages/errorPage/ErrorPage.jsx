import { Link, useRouteError } from "react-router-dom";
import './errorPage.css'

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <br />
      <div><img src="https://rapidapi.com/hub/_next/image?url=%2Fhub%2Fimages%2Fpage-not-found-error.svg&w=256&q=75" alt="" /></div>
      <Link to="/">
        <button className="btn primary">Rudia</button>
      </Link>
    </div>
  );
}
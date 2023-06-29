import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error = useRouteError() as any;
  console.error(error);

  return (
    <div id="error-page" className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-6xl mb-5">Oops!</h1>
      <p className="text-2xl mb-3">Sorry, an unexpected error has occurred.</p>
      <p >
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
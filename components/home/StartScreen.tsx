import Link from "next/link";

export default function StartScreen() {
  return (
    <div className="absolutelyCentered flex items-center flex-col justify-center space-y-6">
      <h1>H.O.R.S.E.Play</h1>
      <p>A Game of horse in your pocket.</p>
      <Link className="btn-basic" href="/play">
        Start!
      </Link>
    </div>
  );
}

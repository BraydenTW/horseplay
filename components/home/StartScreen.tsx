import Link from "next/link";
import Image from "next/image"

export default function StartScreen() {
  return (
    <div className="absolutelyCentered flex items-center flex-col justify-center space-y-6">
      <Image src="/horseplaylogo.png" width={300} height={100} alt="Horseplay Logo" />
      <p>A Game of horse in your pocket.</p>
      <Link className="btn-basic" href="/play">
        Start!
      </Link>
    </div>
  );
}

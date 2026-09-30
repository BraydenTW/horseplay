export default function WhosUp({currentPlayer}: {currentPlayer: string}) {
  return (
    <div>
      Who&apos;s up? <h4 className="uppercase">{currentPlayer}</h4>
    </div>
  );
}

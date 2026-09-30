export default function RoundDetails({round, howManyHaveMadeCurrentMove,playersLeft}: {round: number, howManyHaveMadeCurrentMove: number, playersLeft: number}) {
  return (
    <div className="text-sm pb-4 pl-2">
      <p><b>Move #{round}</b></p>
      <p><b>{howManyHaveMadeCurrentMove}/{playersLeft}</b> Players have made this shot</p>
    </div>
  )
}
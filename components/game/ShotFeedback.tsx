"use client";

import { useEffect, useRef } from "react";

type ShotFeedbackProps = {
  open: boolean;
  made: boolean;
  playerName: string;
  nextPlayerName?: string;
  earnedLetter?: string;
  eliminated?: boolean;
  winnerName?: string;
  gameWord: string;
  lettersEarned: number;
  onContinue: () => void;
};

export default function ShotFeedback({
  open,
  made,
  playerName,
  nextPlayerName,
  earnedLetter,
  eliminated = false,
  winnerName,
  onContinue,
  lettersEarned,
  gameWord
}: ShotFeedbackProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="shot-feedback-title"
      aria-describedby="shot-feedback-description"
      onCancel={(event) => {
        event.preventDefault();
        onContinue();
      }}
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-black/95 p-6 text-white backdrop:bg-black/80"
    >
      {open && (
        <div className="flex min-h-full flex-col items-center justify-center text-center">
          <div
            aria-hidden="true"
            className={`mb-6 flex h-24 w-24 items-center justify-center rounded-full border-2 text-5xl ${
              made
                ? "border-green-400 bg-green-400/10 text-green-400"
                : "border-rose-400 bg-rose-400/10 text-rose-400"
            }`}
          >
            {made ? "✓" : "✕"}
          </div>

          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-zinc-400">
            {playerName}
          </p>

          <h2
            id="shot-feedback-title"
            className="text-5xl font-black uppercase"
          >
            {made ? "Made it!" : "Missed!"}
          </h2>

          <div
            className="mt-6 flex flex-wrap justify-center gap-2"
            aria-label={`${playerName} has ${lettersEarned} of ${gameWord.length} letters`}
          >
            {gameWord.split("").map((letter, index) => {
              const earned = index < lettersEarned;
              // const justEarned =
              //   Boolean(earnedLetter) && index === lettersEarned - 1;

              const playLetterAnimation = !made && lettersEarned - 1 == index

              return (
                <span
                  key={index}
                  aria-hidden="true"
                  className={`inline-block text-4xl font-black transition-colors delay-400 duration-300 ${earned ? `${playLetterAnimation
                        ? "trarnsition-colors durartion-300"
                        : "trarnsition-none"} text-white` : "text-stone-500"
                      
                  }`}
                >
                  {letter}
                </span>
              );
            })}
          </div>

          <div
            id="shot-feedback-description"
            className="mt-4 space-y-3 text-lg text-zinc-300"
          >
            {earnedLetter && (
              <p>
                {playerName} gets a{" "}
                <strong className="text-rose-400">{earnedLetter}</strong>.
              </p>
            )}

            {eliminated && <p>{playerName} is out!</p>}

            {winnerName ? (
              <p className="text-2xl font-bold text-amber-300">
                🏆 {winnerName} wins!
              </p>
            ) : (
              nextPlayerName && (
                <p>
                  Up next:{" "}
                  <strong className="text-white">{nextPlayerName}</strong>
                </p>
              )
            )}
          </div>

          <button
            autoFocus
            type="button"
            onClick={onContinue}
            className="mt-10 min-h-14 w-full max-w-xs rounded-full bg-white px-8 py-4 text-lg font-bold text-black transition hover:bg-zinc-200 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-green-400"
          >
            {winnerName ? "See results" : "Next turn →"}
          </button>
        </div>
      )}
    </dialog>
  );
}

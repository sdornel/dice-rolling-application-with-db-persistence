'use client';

import DiceContainer from "./diceContainer/page";

export default function Home() {
  return (
    <main>
      <h1>Roll the dice! You know you want to...</h1>
      <h5>(Click dice to roll)</h5>
      <DiceContainer />
    </main>
  );
}

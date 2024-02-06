'use client';

import Image from "next/image";
import styles from "./page.module.css";
import { Dispatch, SetStateAction } from "react";
import DiceContainer from "./diceContainer/page";

export default function Home() {
  // const [number, setNumber] = useState(null); // don't forget to type this.
  return (
    <main>
      <h1>Roll the dice! You know you want to...</h1>
      <h5>(Click dice to roll)</h5>
      <DiceContainer />
    </main>
  );
  // return null;
}

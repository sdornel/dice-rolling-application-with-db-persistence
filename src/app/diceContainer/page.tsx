import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import { PreviousRollContainer } from '../previousRollsContainer/page';

export default function DiceContainer() {
  const clickedDice = useRef<boolean>(false);

    /**
     * ensures the library is only loaded on the client side. if imported in API
     * will get node_modules/react-dice-complete/dist/react-dice-complete.js (1:245) @ self
     * ReferenceError: self is not defined
     */
    const ReactDice = dynamic(() => import('react-dice-complete'), {
      ssr: false,
      loading: () => <div>Loading...</div>, // Fallback content while ReactDice is loading
    });

  const rollDone = async (totalValue: number, values: number[]): Promise<void> => {
    // values array is for when you have more than one dice
    // see https://www.npmjs.com/package/react-dice-complete
    if (clickedDice.current) {
        await postToApi(values);
        await fetchData();
    }
  }

  const postToApi = async (values: Array<number>): Promise<void> => {
    await fetch('http://localhost:3000/api/rolls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values[0]),
    });
    clickedDice.current = false;
  }

  const fetchData = async (): Promise<{ previousRolls: Array<Roll> }> => {
    const response = await fetch('http://localhost:3000/api/rolls', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
    })
    return await response.json();
  };

  return (
    <main>
      <div onClick={() => {
        clickedDice.current = true;
      }}>
        <ReactDice
          numDice={1}
          rollDone={rollDone}
          faceColor="black"
          dotColor="white"
        />
        <PreviousRollContainer fetchData={fetchData}/>
      </div>
    </main>
  );
}

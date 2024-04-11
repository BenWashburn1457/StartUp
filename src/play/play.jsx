import React from 'react';
import { Game } from './game'

export function Play(props) {
  return (
    <main className='bg-secondary'>
      <Game userName={props.userName} />
    </main>
  );
}
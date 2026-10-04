import React, { useEffect, useRef, useState } from "react";
import sounds1 from "../../public/audio/1.wav";
import sounds2 from "../../public/audio/2.wav";
import sounds3 from "../../public/audio/3.wav";
import sounds4 from "../../public/audio/4.wav";

const sounds = [sounds1, sounds2, sounds3, sounds4];

interface MathadorProps {
  applause: number;
  setMatarodPosition: React.Dispatch<React.SetStateAction<number>>;
  matadorPosition: number;
}

export const Matador = React.memo(
  function Matador(props: MathadorProps) {
    const refPosition = useRef(props.matadorPosition);

    useEffect(() => {
      new Audio(sounds[props.applause]).play();
    }, [props.applause]);

    useEffect(() => {
      const handler = (event: Event) => {
        const customEvent = event as CustomEvent<{ position: number }>;
        const bullPosition = customEvent.detail.position;
        if (bullPosition === refPosition.current) {
          const newPosition = getNewPosition(refPosition.current);
          console.log(` Matador is moving from ${refPosition.current} to ${newPosition}`);
          refPosition.current = newPosition;
          props.setMatarodPosition(newPosition);
        }
      };

      document.addEventListener("bullRun", handler);

      return () => {
        document.removeEventListener("bullRun", handler);
      };
    }, []);

    return <div>i am matador</div>;
  },
  (prevProps, nextProps) => {
    return nextProps.applause !== 3 || prevProps.applause === 3;
  },
);

function getNewPosition(position: number) {
  let newPosition = Math.floor(Math.random() * 9);
  if (newPosition === position) {
    newPosition = getNewPosition(position);
  }
  return newPosition;
}

function getNewApplause(applause: number) {
  return Math.floor(Math.random() * 4);
}

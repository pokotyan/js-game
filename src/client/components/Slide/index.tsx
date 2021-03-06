import React from "react";
import { useTransition, animated } from "react-spring";
import style from "./style.module.scss";
import { PHASE } from "../../reducers/game";

const component = (children: any[]) => ({ style }: { style: any }) => (
  <animated.div style={style}>{children}</animated.div>
);

const getIndex = (phase: PHASE) => {
  let index = 0;

  if (phase === "INITIAL") {
    index = 0;
  } else if (phase === "THINK") {
    index = 1;
  } else if (phase === "PLAYER_TURN") {
    index = 2;
  } else if (phase === "ENEMY_TURN") {
    index = 3;
  } else if (phase === "WIN") {
    index = 4;
  } else if (phase === "LOSE") {
    index = 5;
  }

  return index;
};

export default ({ phase, children }: { phase: PHASE; children: any[] }) => {
  const index = getIndex(phase);

  const transitions = useTransition(index, p => p, {
    from: { opacity: 0, transform: "translate3d(100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0,0,0)" },
    leave: { opacity: 0, transform: "translate3d(-50%,0,0)" }
  });

  return (
    <div className={style.container}>
      {transitions.map(({ item, props, key }) => {
        const Page = component(children[item]);

        return <Page key={key} style={props} />;
      })}
    </div>
  );
};

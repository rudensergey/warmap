// Absolute imports
import React from "react";

// Components
import Button from "@shared/Button";

// Types
import { MAIN } from "./Main.types";

const MainTemplate = () => {
  return (
    <>
      <div className={MAIN.MAIN}>
        <p className={MAIN.TITLE}>Alogrithms visualiser</p>
        <Button className={MAIN.BUTTON_GRAPH} href="/graph" asHref="/graph">
          Graphs
        </Button>
        <Button className={MAIN.BUTTON_SORT} href="/sort" asHref="/sort">
          Sorting
        </Button>
      </div>
      <div className={MAIN.LOGIN}>
        <Button href="/auth" asHref="/auth">
          Sign in
        </Button>
      </div>
    </>
  );
};

export default MainTemplate;

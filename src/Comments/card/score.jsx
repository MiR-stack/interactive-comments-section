import styled from "styled-components";

import { Button } from "./utils";

const ScoreWraper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background: hsl(223, 19%, 93%);
  border-radius: 5px;
  justify-content:center;
  float:left;
  margin-right:20px;
  @media(max-width:500px){
    float:none;
    flex-direction:row;
  }
`;

const Score = styled.p`
  color: hsl(238, 40%, 52%);
  fon-weight: 700;
  font-size: small;
`;

export default function Scores({ score }) {
  return (
    <ScoreWraper>
      <Button>
        <img src="./images/icon-plus.svg" alt="delete" />
      </Button>
      <Score>{score} </Score>
      <Button>
        <img src="./images/icon-minus.svg" alt="delete" />
      </Button>
    </ScoreWraper>
  );
}

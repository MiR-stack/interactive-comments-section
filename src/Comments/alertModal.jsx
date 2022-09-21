import { useState } from "react";
import styled from "styled-components";

const TransperantBG = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
`;

const Modal = styled.div`
  padding: 20px;
  border-radius: 10px;
  background: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
`;
const Content = styled.p`
  padding: 10px 0;
  font-family: "Rubik", sans-serif;
  color: hsl(211, 10%, 45%);
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const Button = styled.button`
  padding: 10px 15px;
  text-transform: uppercase;
  border-radius: 5px;
  border: none;
  width: 100%;
  cursor: pointer;
  color: hsl(223, 19%, 93%);
  background: ${(props) => props.bg};
`;

export default function AlertModal({ handleModal, feedback }) {

  return (
    <>
    <TransperantBG onClick={handleModal} />
    <Modal>
      <h3 style={{ color: "hsl(212, 24%, 26%)" }}>Delete comment</h3>
      <Content>
        Are you sure you want to delete this comment? this will remove the
        comment and can't be undone
      </Content>
      <ButtonGroup>
        <Button
          bg={"hsl(211, 10%, 45%)"}
          onClick={() => {
            feedback(false);
            handleModal();
          }}
        >
          no,cancel
        </Button>
        <Button
          bg={"hsl(358, 79%, 66%)"}
          onClick={() => {
            feedback(true);
            handleModal();
          }}
        >
          yes,delete
        </Button>
      </ButtonGroup>
    </Modal>
  </>
  );
}

import styled from "styled-components";
import { Button } from "./utils";

const ReplyButton = styled(Button)`
  font-weight: 700;
  text-transform: capitalize;
  display: flex;
  gap: 5px;
  color: hsl(238, 40%, 52%);

  &:hover {
    color: hsl(239, 57%, 85%);
  }
`;
const BtnGorup = styled.div`
  display: flex;
  gap: 10px;
  float: right;
  @media (max-width: 500px) {
    float: none;
  }
`;

export default function Buttons({
  data,
  user,
  toggleInput,
  handleEdit,
  handleDelete,
  handleModal,
}) {
  return (
    <BtnGorup>
      {data.user.username === user.username ? (
        <>
          <ReplyButton
            style={{ color: "hsl(358, 79%, 66%)" }}
            onClick={() => {
              // handleDelete(data.type, data.commentId, data.replyId);
              handleModal(data.type, data.commentId, data.replyId);
            }}
          >
            <img src="./images/icon-delete.svg" alt="delete" /> delete
          </ReplyButton>
          <ReplyButton onClick={handleEdit}>
            <img src="./images/icon-edit.svg" alt="edit" />
            edit
          </ReplyButton>
        </>
      ) : (
        <ReplyButton
          onClick={() =>
            toggleInput({ type: "reply", repliedTo: data.user.username })
          }
        >
          <img src="./images/icon-reply.svg" alt="reply" />
          reply
        </ReplyButton>
      )}
    </BtnGorup>
  );
}

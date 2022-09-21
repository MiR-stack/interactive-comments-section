import { useState } from "react";
import styled from "styled-components";

import { v4 as uuid } from "uuid";

const Reply = styled.div`
  background: hsl(0, 0%, 100%);
  padding: 20px;
  border-radius: 10px;

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column-reverse;
  }
  ${(props) =>
    props.type === "update" &&
    `padding:10px;
     display:flex;
     border-radius:5px;
     gap:10px;
     flex-direction:column-reverse;
    `}
`;

const Avatar = styled.img`
  height: 30px;
  width: 30px;
  float: left;
  @media (max-width: 600px) {
    float: none;
  }
`;

const Input = styled.textarea`
  height: 70px;
  padding: 10px;
  width: 74%;
  border-radius: 5px;
  outline: none;
  border: 1px solid hsl(211, 10%, 45%);
  resize: none;
  font-weight: 500;
  color: hsl(211, 10%, 45%);
  font-family: "Rubik", sans-serif;
  margin-left: 10px;
  @media (max-width: 600px) {
    width: 100%;
    margin: 0;
  }

  ${(props) =>
    props.name === "update" &&
    `
    width:100%;
  `}
`;

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  outline: none;
  background: hsl(238, 40%, 52%);
  color: hsl(0, 0%, 100%);
  text-transform: uppercase;
  cursor: pointer;
  margin-left: auto;
  float: right;
  &:hover {
    background: hsl(239, 57%, 85%);
  }
  @media (max-width: 600px) {
    float: none;
  }
`;

const Action = styled.div`
  @media (max-width: 600px) {
    display: flex;
    margin-top: 20px;
  }
`;

export default function ReplyInput({
  handleReply,
  defaultData,
  id,
  card,
  handleUpdate,
  handleEdit,
}) {
  const { repliedTo, update, type, user } = defaultData;

  const DefaultData = {
    reply: `@${repliedTo}`,
    update: update || "",
    comment: "",
  };

  const [data, setData] = useState({
    ...DefaultData,
  });

  function handleSubmit() {
    if (!data[type]) return;

    let reply = {
      id: uuid(),
      content: data[type],
      createdAt: "1m ago",
      score: 0,
      user,
    };

    if (type === "comment") {
      reply.replies = [];
    }
    if (type === "reply") {
      (reply.content = data[type].slice(repliedTo.length + 1)),
        (reply.replyingTo = repliedTo);
    }

    if (type === "update") {
      if (card.type === "reply") {
        reply.replyingTo = card.repliedTo;
      }
      reply.content = data[type].slice(
        card.type === "comment" ? 1 : card.repliedTo.length + 1
      );

      handleUpdate(reply.content, card.type, card.commentId, card.replyId);
      handleEdit();
      return;
    }

    handleReply(reply, type, { type, content: id });
    setData(DefaultData);
  }

  return (
    <Reply type={type}>
      <Action>
        {type !== "update" && (
          <Avatar type={type} src={user.image.webp} alt={user.username} />
        )}
        <Button onClick={handleSubmit}>{type}</Button>
      </Action>
      <Input
        style={type === "update" ? { height: "100px" } : {}}
        type="text"
        name={type}
        value={data[type]}
        placeholder={`Add a ${type}...`}
        onChange={(e) => setData({ ...data, [type]: e.target.value })}
      />
    </Reply>
  );
}

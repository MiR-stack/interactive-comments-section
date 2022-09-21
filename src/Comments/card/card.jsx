import { useState } from "react";
import { Link } from "react-router-dom";
import style from "styled-components";
import ReplyInput from "../input";
import AlertModal from "../alertModal";
import Buttons from "./buttons";
import Header from "./header";
import Scores from "./score";

const Card = style.div`
  padding:20px;
  background:white;
  margin:20px 0;
  border-radius:10px;
  @media (max-width:500px){
    display:flex;
  align-items:center;
  flex-direction:column-reverse;
  justify-content:space-between;
  }
  
`;

const Actions = style.div`
@media(max-width:500px){
  width:100%;
  margin-top:20px;
  display:flex;
  align-items:center;
  justify-content:space-between;
}
  
`;

export default function CommentCard({
  data,
  toggleInput,
  user,
  handleUpdate,
  handleModal,
}) {
  const [edit, setEdit] = useState(false);

  function handleEdit() {
    setEdit(!edit);
  }

  
  return (
    <Card>
      <Actions >
        <Scores score={data.score} />
        <Buttons
          user={user}
          data={data}
          toggleInput={toggleInput}
          handleEdit={handleEdit}
          handleModal={handleModal}
        />
      </Actions>
      <div style={{ width: "100%" }}>
        <Header data={data} />
        {edit ? (
          <ReplyInput
            defaultData={{
              type: "update",
              update: `${data.type === "reply" ? `@${data.replyingTo}` : ""} ${
                data.content
              }`,
            }}
            card={{
              type: data.type,
              commentId: data.commentId,
              replyId: data.replyId,
              repliedTo: data.replyingTo,
            }}
            handleUpdate={handleUpdate}
            handleEdit={handleEdit}
          />
        ) : (
          <p
            style={{
              color: "hsl(211, 10%, 45%)",
              fontSize: "16px",
              overflow: "auto",
            }}
          >
            {data.replyingTo && (
              <Link
                style={{ color: "hsl(238, 40%, 52%)", textDecoration: "none" }}
                to={"/"}
              >
                {`@${data.replyingTo}`}{" "}
              </Link>
            )}
            {data.content}
          </p>
        )}
      </div>
    </Card>
  );
}

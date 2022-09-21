import { useEffect, useState } from "react";

import Card from "./card/card";
import Data from "./data.json";

import styled from "styled-components";
import ReplyInput from "./input";
import AlertModal from "./alertModal";

const Comments = styled.div`
  font-family: "Rubik", sans-serif;
  width: 600px;
  margin: 20px auto;
  @media (max-width: 600px) {
    width: 97%;
  }
`;

const Replies = styled.div`
  margin-left: 30px;
  padding-left: 30px;
  border-left: 1px solid hsl(239, 57%, 85%);
`;

export default function CommentBox() {
  const [Coments, setComents] = useState(Data.comments);
  const defaultInput = {
    user: Data.currentUser,
    type: "",
    repliedTo: "",
  };
  const [input, setInput] = useState({ ...defaultInput });

  function toggleInput(data) {
    setInput({ ...data, user: Data.currentUser });
  }

  function handleReply(reply, type, id) {
    let Reply = Coments;
    if (type === "comment") {
      Reply.push(reply);
    } else if (type === "reply") {
      Reply = Coments.reduce((acc, cur) => {
        if (cur.id === id.content) {
          cur.replies.push(reply);
        }
        acc.push(cur);
        return acc;
      }, []);
    }

    console.log(Reply);

    setComents([...Reply]);
    setInput({ ...defaultInput });
  }

  //edit any comments or reply

  function handleUpdate(content, type, commentId, replyId) {
    let updatedData = Coments;
    if (type === "comment") {
      updatedData = updatedData.reduce((acc, comment) => {
        if (comment.id === commentId) {
          comment.content = content;
        }
        acc.push(comment);
        return acc;
      }, []);
    }

    if (type === "reply") {
      updatedData = updatedData.map((comment) => {
        if (comment.id === commentId) {
          comment.replies.map((reply) => {
            if (reply.id === replyId) {
              reply.content = content;
            }
            return reply;
          });
        }
        return comment;
      });
    }

    setComents(updatedData);
  }

  const [deleteInfo, setDeleteInfo] = useState();

  // delete commetns or reply

  function handleDelete(type, commentId, replyId) {
    let comments = Coments;

    if (type === "comment") {
      comments = comments.filter((comment) => comment.id !== commentId);
    } else {
      comments = comments.map((comment) => {
        if (comment.id === commentId) {
          comment.replies = comment.replies.filter(
            (reply) => reply.id !== replyId
          );
        }
        return comment;
      });
    }

    setComents(comments);
  }

  const [modal, setModal] = useState(false);

  function handleModal(type, commentId, replyId) {
    setDeleteInfo({ type, commentId, replyId });
    setModal(!modal);
    console.log("clicked");
  }

  function feedback(feedback) {
    if (feedback) {
      handleDelete(deleteInfo.type, deleteInfo.commentId, deleteInfo.replyId);
    }
  }

  return (
    <Comments>
      {modal && <AlertModal handleModal={handleModal} feedback={feedback} />}
      {Coments.map((comment) => (
        <div style={{ marginBottom: "10px" }} key={comment.id}>
          <Card
            data={{ ...comment, type: "comment", commentId: comment.id }}
            user={Data.currentUser}
            toggleInput={toggleInput}
            handleUpdate={handleUpdate}
            handleModal={handleModal}
          />
          {comment.replies.length > 0 && (
            <Replies>
              {comment.replies.map((reply) => (
                <div key={reply.id}>
                  <Card
                    data={{
                      ...reply,
                      type: "reply",
                      commentId: comment.id,
                      replyId: reply.id,
                    }}
                    user={Data.currentUser}
                    toggleInput={toggleInput}
                    handleUpdate={handleUpdate}
                    handleModal={handleModal}
                  />
                  {reply.user.username === input.repliedTo && (
                    <ReplyInput
                      defaultData={input}
                      id={comment.id}
                      handleReply={handleReply}
                    />
                  )}
                </div>
              ))}
            </Replies>
          )}
          {comment.user.username === input.repliedTo && (
            <ReplyInput
              defaultData={input}
              id={comment.id}
              handleReply={handleReply}
            />
          )}
        </div>
      ))}
      <ReplyInput
        defaultData={{ user: Data.currentUser, type: "comment" }}
        handleReply={handleReply}
      />
    </Comments>
  );
}

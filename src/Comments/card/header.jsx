import styled from "styled-components";
import { Link } from "react-router-dom";

const Header = styled.div`
display:flex;
align-items:center;
justify-content:space-between;
margin-bottom:20px;
`;

const UserInfo = styled.div`
display:flex;
align-items:center;
gap:5px;
`;

const Avatar = styled.img`
height:30px;
width:30px;
`;


export default function Headers({data}) {


  return (
    <Header>
      <UserInfo>
        <Avatar src={data.user.image.webp} alt="" />

        <Link
          style={{
            textDecoration: "none",
            fontWeight: 500,
            color: "black",
            textTransform: "capitalize",
          }}
          to={"/"}
        >
          {data.user.username}
        </Link>
        <p style={{ color: "hsl(211, 10%, 45%)" }}>{data.createdAt} </p>
      </UserInfo>
    </Header>
  );
}

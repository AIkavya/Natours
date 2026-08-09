// ReviewCard.jsx

import {
  Card,
  Header,
  User,
  Avatar,
  UserInfo,
  Name,
  Social,
  Review,
  Footer,
  Stars,
  Time,
} from "./ReviewCard.styles";

import { LuInstagram, LuStar } from "react-icons/lu";
import { FaXTwitter } from "react-icons/fa6";

function ReviewCard({ review }) {
  const { avatar, name, social } = review;

  const SocialIcon = social === "instagram" ? LuInstagram : FaXTwitter;

  const getText = () => {
    const width = window.innerWidth;

    if (width <= 700) return review.review.short;
    if (width <= 1100) return review.review.medium;
    return review.review.long;
  };

  return (
    <Card>
      <Header>
        <User>
          <Avatar src={avatar} alt={name} />

          <UserInfo>
            <Name>{name}</Name>
          </UserInfo>
        </User>

        <Social>
          <SocialIcon />
        </Social>
      </Header>

      <Review>{getText()}</Review>

      <Footer>
        <Stars>
          <LuStar fill="currentColor" />
          <LuStar fill="currentColor" />
          <LuStar fill="currentColor" />
          <LuStar fill="currentColor" />
          <LuStar fill="currentColor" />
        </Stars>

        <Time>2d ago</Time>
      </Footer>
    </Card>
  );
}

export default ReviewCard;

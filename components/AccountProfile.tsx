import React  from "react";
import OnboardCard from "./OnboardCard";

interface AccountProfileProps {
  userInfo: any;
}

const AccountProfile = ({ userInfo }: AccountProfileProps) => {
  return <OnboardCard userInfo={userInfo} />;
};

export default AccountProfile;

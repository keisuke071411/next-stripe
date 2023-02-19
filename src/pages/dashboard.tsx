import type { NextPage } from "next";
import { Fragment } from "react";
import { useRecoilValue } from "recoil";
import { DashBoardPageTemplate } from "~/features/DashBoard/DashBoardPageTemplate";
import { withAuthenticated } from "~/hoc/withAuthenticated";
import { authState } from "~/store/auth";

const DashBoardPage: NextPage = (): JSX.Element => {
  const { currentUser } = useRecoilValue(authState);

  if (!currentUser) return <Fragment />;

  return <DashBoardPageTemplate currentUser={currentUser} />;
};

export default withAuthenticated(DashBoardPage);

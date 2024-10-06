import AccountInfo from "@/components/account-info";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { fetchProfileAction } from "@/actions";

const AccountPage = async () => {
  const user = await currentUser();
  const profileInfo = await fetchProfileAction(user?.id);
  console.log(profileInfo, "profileInfo");

  if (!profileInfo) redirect("/onboard");

  return <AccountInfo profileInfo={profileInfo} />;
};

export default AccountPage;

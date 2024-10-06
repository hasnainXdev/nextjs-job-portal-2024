import { currentUser } from "@clerk/nextjs/server";
import { fetchProfileAction } from "@/actions";
import { redirect } from "next/navigation";
import Membership from "@/components/membership";

const MembershipPage = async () => {
  const user = await currentUser();
  const profileInfo = await fetchProfileAction(user?.id);

  const compareMembership =
    profileInfo?.role === "recruiter" ? (
      <Membership profileInfo={profileInfo} />
    ) : null;

  if (!profileInfo) redirect("/onboard");

  return compareMembership;
};

export default MembershipPage;

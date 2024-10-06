import { Fragment, useState } from "react";
import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
} from "../ui/drawer";
import { createJobApplicationAction } from "@/actions";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
// import { useToast } from "@/hooks/use-toast";

const CandidateJobCard = ({ jobItem, profileInfo, jobApplications }) => {
  console.log(jobItem, "jobItem", jobApplications, "jobApplications");

  const { toast } = useToast();
  // job drawer this popup from bottom like magicc✨
  const [jobDetailsDrawer, setJobDetailsDrawer] = useState(false);

  async function handleJobApply() {
    // if (!profileInfo?.isPremiumUser && jobApplications.length >= 5) {
    //   // alert("you're not be able to apply more than 2 jobs");
    //   toast({
    //     variant: "destructive",
    //     title: "You can apply max 2 jobs",
    //     description: "Please opt for premium account to apply more than 2 jobs",
    //     action: <Link href={"/membership"}>Choose Membership</Link>,
    //   });

    //   setJobDetailsDrawer(false);
    //   return;
    // }
    await createJobApplicationAction(
      {
        recruiterUserID: jobItem?.recruiterId,
        name: profileInfo?.candidateInfo?.name,
        email: profileInfo?.email,
        candidateUserID: profileInfo?.userId,
        status: ["Applied"],
        jobID: jobItem?._id,
        jobAppliedDate: new Date().toLocaleDateString(),
      },
      "/jobs"
    );
    setJobDetailsDrawer(false);
  }

  // drawer start's from here✅

  return (
    <Fragment>
      <Drawer open={jobDetailsDrawer} onOpenChange={setJobDetailsDrawer}>
        <CommonCard
          icon={<JobIcon />}
          title={jobItem?.title}
          description={jobItem?.companyName}
          footerContent={
            <Button
              onClick={() => setJobDetailsDrawer(true)}
              className="flex h-11 items-center justify-center px-5"
            >
              View Details
            </Button>
          }
        />
        <DrawerContent className="px-6">
          <DrawerHeader className="p-0">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-extrabold text-gray-900">
                {jobItem?.title}
              </h1>

              <div className="flex items-center gap-3">
                <Button
                  onClick={handleJobApply}
                  disabled={
                    jobApplications.findIndex(
                      (item) => item?.jobID === jobItem?._id
                    ) > -1
                      ? true
                      : false
                  }
                  className="disabled:opacity-65 flex h-11 items-center justify-center px-5"
                >
                  {jobApplications.findIndex(
                    (item) => item.jobID === jobItem?._id
                  ) > -1
                    ? "Applied"
                    : "Apply"}
                </Button>
                <Button
                  className="flex h-11 items-center justify-center px-5"
                  onClick={() => setJobDetailsDrawer(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DrawerHeader>
          <DrawerDescription className="text-2xl text-medium text-gray-600 mt-4">
            {jobItem?.description}
            <span className="text-xl font-normal ml-3 text-gray-500">
              {jobItem?.location}
            </span>
          </DrawerDescription>
          <div className="w-[150px] mt-6 flex items-center justify-center h-[40px] bg-black rounded-sm">
            <h2 className="text-xl font-bold text-white">
              {jobItem?.type} time
            </h2>
          </div>
          <h3 className="text-2xl font-medium text-black mt-3">
            Experince {jobItem?.experince} Year
          </h3>
          <div className="flex gap-4 mt-6">
            {jobItem?.skills.split(",").map((skillItem) => (
              <div className="w-[100px] flex items-center justify-center h-[35px] bg-black rounded-[4px]">
                <h2 className="text-[13px] font-medium text-white">
                  {skillItem}
                </h2>
              </div>
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
};

export default CandidateJobCard;

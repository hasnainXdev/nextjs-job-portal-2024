"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import CommonForm from "../common-form";
import {
  initialPostNewJobFormData,
  membershipLimits,
  postNewJobFormControls,
} from "@/utils";
import { postNewJobAction } from "@/actions";
import { useToast } from "@/hooks/use-toast";
import { Link } from "lucide-react";

function PostNewJob({ profileInfo, user, jobList }) {
  console.log(profileInfo, "profileInfo");
  const [showJobDialog, setShowJobDialog] = useState(false);
  const [jobFormData, setJobFormData] = useState({
    ...initialPostNewJobFormData,
    companyName: profileInfo?.recruiterInfo?.companyName,
  });

  const { toast } = useToast();

  function handlePostNewBtnValid() {
    return Object.keys(jobFormData).every(
      (control) => jobFormData[control].trim() !== ""
    );
  }

  function handleAddNewJob() {
    if (!profileInfo?.isPremiumUser && jobList.length >= 2) {
      toast({
        // If the user has reached or exceeded the job limit
        variant: "destructive",
        title: `You have reached your job posting limit.`,
        description: `Upgrade your membership to post more jobs.`,
      });
      return;
    }
    // If they haven't reached the limit, open the job dialog
    setShowJobDialog(true);
  }

  function handleAddFiveJob() {
    if (!profileInfo?.memberShipType === "basic" && jobList.length >= 7) {
      toast({
        // If the user has reached or exceeded the job limit
        variant: "destructive",
        title: `Plan ended You have posted 5 jobs`,
        description: `Upgrade your membership to post more jobs.`,
      });
      return;
    }
    // If they haven't reached the limit, open the job dialog
    setShowJobDialog(true);
  }

  function handleAddTenJob() {
    if (profileInfo?.memberShipType === "teams" && jobList.length >= 17) {
      toast({
        // If the user has reached or exceeded the job limit
        variant: "destructive",
        title: `Plan ended You have posted 10 jobs`,
        description: `Upgrade your membership to post more jobs.`,
      });
      return;
    }
    // If they haven't reached the limit, open the job dialog
    setShowJobDialog(true);
  }

  function handleAddInfinityJob() {
    if (profileInfo?.memberShipType === "enterprice" && jobList.length >= 110) {
      toast({
        // If the user has reached or exceeded the job limit
        variant: "destructive",
        title: `Plan ended You have posted 100 jobs`,
        description: `Upgrade your membership to post more jobs.`,
      });
      return;
    }
    // If they haven't reached the limit, open the job dialog
    setShowJobDialog(true);
  }

  async function createNewJob() {
    await postNewJobAction(
      {
        ...jobFormData,
        recruiterId: user?.id,
        applicants: [],
      },
      "/jobs"
    );

    setJobFormData({
      ...initialPostNewJobFormData,
      companyName: profileInfo?.recruiterInfo?.companyName,
    });
    setShowJobDialog(false);
  }

  return (
    <div>
      <Button
        onClick={() => {
          profileInfo?.memberShipType === "basic"
            ? handleAddFiveJob()
            : profileInfo?.memberShipType === "teams"
            ? handleAddTenJob()
            : profileInfo?.memberShipType === "enterprice"
            ? handleAddInfinityJob()
            : handleAddNewJob();
        }}
        className="disabled:opacity-60 flex h-11 items-center justify-center px-5"
      >
        Post A Job
      </Button>
      <Dialog
        open={showJobDialog}
        onOpenChange={() => {
          setShowJobDialog(false);
          setJobFormData({
            ...initialPostNewJobFormData,
            companyName: profileInfo?.recruiterInfo?.companyName,
          });
        }}
      >
        <DialogContent className="sm:max-w-screen-md h-[600px] overflow-auto">
          <DialogHeader>
            <DialogTitle>Post New Job</DialogTitle>
            <div className="grid gap-4 py-4">
              <CommonForm
                buttonText={"Add"}
                formData={jobFormData}
                setFormData={setJobFormData}
                formControls={postNewJobFormControls}
                isBtnDisabled={!handlePostNewBtnValid}
                action={createNewJob}
              />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PostNewJob;

"use client";

import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  getCandidateDetailsByIDAction,
  updateJobApplicationAction,
} from "@/actions";
import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient(
  "https://fyyazwefqztvfulygrig.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5eWF6d2VmcXp0dmZ1bHlncmlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgyMDcyNDEsImV4cCI6MjA0Mzc4MzI0MX0.7fZYLetZkq5Kz5KDoP8cRgmueKTAwn1MFoBHKk36Qjw"
);

const CandidateList = ({
  jobApplications,
  setCurrentCandidateDetails,
  currentCandidateDetails,
  showCurrentCandidateDetailsModal,
  setShowCurrentCandidateDetailsModal,
}) => {
  async function handleFetchCandidateDetails(getCurrentCandidateId) {
    const data = await getCandidateDetailsByIDAction(getCurrentCandidateId);

    console.log(data);
    if (data) {
      setCurrentCandidateDetails(data);
      setShowCurrentCandidateDetailsModal(true);
    }
  }

  console.log(currentCandidateDetails?.candidateInfo?.skills);

  function handlePreviewResume() {
    const { data } = supabaseClient.storage
      .from("public-job-board")
      .getPublicUrl(currentCandidateDetails?.candidateInfo?.resume);

    console.log(data);
    const a = document.createElement("a");
    a.href = data?.publicUrl;
    a.setAttribute("download", "Resume.pdf");
    a.setAttribute("target", "_blank");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  async function handleUpdateJobStatus(getCurrentStatus) {
    let cpyJobApplicants = [...jobApplications];
    const indexOfCurrentJobApplicant = cpyJobApplicants.findIndex(
      (item) => item.candidateUserID === currentCandidateDetails?.userId
    );

    const jobApplicantsToUpdate = {
      ...cpyJobApplicants[indexOfCurrentJobApplicant],
      status:
        cpyJobApplicants[indexOfCurrentJobApplicant].status.concat(
          getCurrentStatus
        ),
    };

    console.log(jobApplicantsToUpdate);
    await updateJobApplicationAction(jobApplicantsToUpdate, "/jobs");
  }

  console.log(jobApplications);

  return (
    <Fragment>
      <div className="grid grid-cols-1 gap-3 p-10 md:grid-cols-2 lg:grid-cols-3">
        {jobApplications && jobApplications.length > 0
          ? jobApplications.map((jobApplicantItem) => (
              <div className="bg-white shadow-lg w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4">
                <div className="flex justify-between items-center px-4 my-6">
                  <h3 className="text-lg font-bold">
                    {jobApplicantItem?.name}
                  </h3>
                  <Button
                    onClick={() =>
                      handleFetchCandidateDetails(
                        jobApplicantItem?.candidateUserID
                      )
                    }
                    className="flex h-11 items-center justify-center px-5"
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            ))
          : null}
      </div>
      <Dialog
        open={showCurrentCandidateDetailsModal}
        onOpenChange={() => {
          setCurrentCandidateDetails(null);
          setShowCurrentCandidateDetailsModal(false);
        }}
      >
        <DialogContent>
          <div>
            <h1 className="text-2xl font-bold text-black">
              {currentCandidateDetails?.candidateInfo?.name},{" "}
              {currentCandidateDetails?.email}
            </h1>
            <p className="text-xl font-medium text-black">
              {currentCandidateDetails?.candidateInfo?.currentCompany}
            </p>
            <p className="text-sm font-normal text-black">
              {currentCandidateDetails?.candidateInfo?.currentJobLocation}
            </p>
            <p>
              Total Experience:{" "}
              {currentCandidateDetails?.candidateInfo?.totalExperience} Years
            </p>
            <p>
              Salary {currentCandidateDetails?.candidateInfo?.currentSalary} LPA
            </p>
            <p>
              Notice Period:{" "}
              {currentCandidateDetails?.candidateInfo?.noticePeriod} Days
            </p>
          </div>
          <div className="flex items-center gap-4 mt-6">
            <h1 className="flex items-center mt-5">Previous Companies</h1>
            <div className="flex flex-wrap items-center gap-4 mt-6">
              {currentCandidateDetails?.candidateInfo?.previousCompanies
                .split(",")
                .map((companiesList) => (
                  <div className="w-[100px] flex items-center justify-center h-[35px] bg-black rounded-[4px]">
                    <h2 className="text-[13px] font-medium text-white">
                      {companiesList}
                    </h2>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-6">
            {currentCandidateDetails?.candidateInfo?.skills
              .split(",")
              .map((skillItem) => (
                <div className="w-[110px] flex items-center justify-center h-[35px] bg-black rounded-[4px]">
                  <h2 className="text-[13px] font-medium text-white">
                    {skillItem}
                  </h2>
                </div>
              ))}
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handlePreviewResume}
              className="flex h-11 items-center justify-center px-5"
            >
              Resume
            </Button>
            <Button
              onClick={() => handleUpdateJobStatus("selected")}
              disabled={
                // we will checking that it's selected or not
                jobApplications
                  .find(
                    (item) =>
                      item.candidateUserID === currentCandidateDetails?.userId
                  )
                  ?.status.includes("selected") ||
                // we will checking that it's rejected or not
                jobApplications
                  .find(
                    (item) =>
                      item.candidateUserID === currentCandidateDetails?.userId
                  )
                  ?.status.includes("rejected")
                  ? true
                  : false
              }
              className="disabled:opacity-65 flex h-11 items-center justify-center px-5"
            >
              {jobApplications
                .find(
                  (item) =>
                    item.candidateUserID === currentCandidateDetails?.userId
                )
                ?.status.includes("selected")
                ? "Selected"
                : "Select"}
            </Button>
            <Button
              onClick={() => handleUpdateJobStatus("rejected")}
              className="disabled:opacity-65 flex h-11 items-center justify-center px-5"
              disabled={
                // we will checking that it's selected or not
                jobApplications
                  .find(
                    (item) =>
                      item.candidateUserID === currentCandidateDetails?.userId
                  )
                  ?.status.includes("selected") ||
                // we will checking that it's rejected or not
                jobApplications
                  .find(
                    (item) =>
                      item.candidateUserID === currentCandidateDetails?.userId
                  )
                  ?.status.includes("rejected")
                  ? true
                  : false
              }
            >
              {jobApplications
                .find(
                  (item) =>
                    item.candidateUserID === currentCandidateDetails?.userId
                )
                ?.status.includes("rejected")
                ? "Rejected"
                : "Reject"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default CandidateList;

"use client";

import { useState } from "react";
import CommonCard from "../common-card";
import JobApplicants from "../job-applicants";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";

const RecruiterJobCard = ({ jobItem, jobApplications }) => {
  const [showApplicantsDrawer, setShowApplicantsDrawer] = useState(false);
  const [currentCandidateDetails, setCurrentCandidateDetails] = useState(null);
  const [
    showCurrentCandidateDetailsModal,
    setShowCurrentCandidateDetailsModal,
  ] = useState(false);


  return (
    <div>
     <CommonCard
        icon={<JobIcon />}
        title={jobItem?.title}
        footerContent={
          <Button
            onClick={() => setShowApplicantsDrawer(true)}
            disabled={
              jobApplications.filter((item) => item.jobID === jobItem?._id)
                .length === 0
            }
            className="disabled:opacity-55 flex h-11 items-center justify-center px-5"
          >
            {
              jobApplications.filter((item) => item.jobID === jobItem?._id)
                .length
            }{" "}
            Applicants
          </Button>
        }
      />
      <JobApplicants
         showApplicantsDrawer={showApplicantsDrawer}
         setShowApplicantsDrawer={setShowApplicantsDrawer}
         showCurrentCandidateDetailsModal={showCurrentCandidateDetailsModal}
         setShowCurrentCandidateDetailsModal={
           setShowCurrentCandidateDetailsModal
         }
         currentCandidateDetails={currentCandidateDetails}
         setCurrentCandidateDetails={setCurrentCandidateDetails}
         jobItem={jobItem}
         jobApplications={jobApplications.filter(
           (jobApplicantItem) => jobApplicantItem.jobID === jobItem?._id
         )}
      />
    </div>
  );
};

export default RecruiterJobCard;

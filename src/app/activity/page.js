import { currentUser } from "@clerk/nextjs/server";
import { fetchJobApplicationsForCandidate, fetchJobsForCandidateAction } from "@/actions";
import CandidateActivity from "@/components/candidate-activity";


const Activity = async () => {

    const user = await currentUser();
    const jobList = await fetchJobsForCandidateAction();
    const jobApplicants = await fetchJobApplicationsForCandidate(user?.id);

  return <div>
    <CandidateActivity
    jobList={jobList}
    jobApplicants={jobApplicants}
    />
  </div>
};

export default Activity;

"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import CommonFrom from "../common-form";
import {
  candidateOnboardFormControls,
  initialCandidateFormData,
  initialRecruiterFormData,
  recruiterOnboardFormControls,
} from "@/utils";
import { useUser } from "@clerk/nextjs";
import { createProfileAction } from "@/actions";
import { createClient } from "@supabase/supabase-js";

// connecting supabase client from API key & URL
const supabaseClient = createClient(
  "https://fyyazwefqztvfulygrig.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5eWF6d2VmcXp0dmZ1bHlncmlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgyMDcyNDEsImV4cCI6MjA0Mzc4MzI0MX0.7fZYLetZkq5Kz5KDoP8cRgmueKTAwn1MFoBHKk36Qjw"
);

const OnBoard = () => {
  // State for the current tab
  const [currentTab, setCurrentTab] = useState("candidate");
  // State for the recruiter form data
  const [recruiterFormData, setRecruiterFormData] = useState(
    initialRecruiterFormData
  );
  // State for the candidate form data
  const [candidateFormData, setCandidateFormData] = useState(
    initialCandidateFormData
  );
  const [file, setFile] = useState(null);

  const currentAuthUser = useUser();
  const { user } = currentAuthUser;

  const handleFileChange = (event) => {
    event.preventDefault();
    setFile(event.target.files[0]);
  };

  // Function to upload pdf to supabase
  async function handleUploadPdfToSupabase() {
    const { data, error } = await supabaseClient.storage
      .from("public-job-board")
      .upload(`/public/${file.name}`, {
        cacheControls: "3600",
        upsert: false,
      });
    console.log(data, error);

    if (data) {
      setCandidateFormData({
        ...candidateFormData,
        resume: data.path,
      });
      console.log(error);
    }
  }

  useEffect(() => {
    if (file) handleUploadPdfToSupabase();
  }, [file]);

  // Function to handle changes to the current tab
  function handleTabsChange(value) {
    setCurrentTab(value);
  }

  // Function to handle the recruiter form submit
  function handleRecruiterFormValid() {
    return (
      recruiterFormData &&
      recruiterFormData.name.trim() !== "" &&
      recruiterFormData.companyName.trim() !== "" &&
      recruiterFormData.companyRole.trim() !== ""
    );
  }

  function handleCandidateFormValid() {
    return Object.keys(candidateFormData).every(
      (key) => candidateFormData[key].trim() !== ""
    );
  }

  // Call the create profile action with the recruiter form data
  // and redirect to the onboarding page after success
  async function createProfile() {
    const data =
      currentTab === "candidate"
        ? {
            candidateInfo: candidateFormData,
            role: "candidate",
            isPremiumUser: false,
            userId: user?.id,
            email: user?.primaryEmailAddress?.emailAddress,
          }
        : {
            recruiterInfo: recruiterFormData,
            role: "recruiter",
            isPremiumUser: false,
            userId: user?.id,
            email: user?.primaryEmailAddress?.emailAddress,
          };

    await createProfileAction(data, "/onboard");
  }

  console.log(candidateFormData);

  return (
    <div className="bg-white">
      {/* Render the tabs component with the current tab state and onChange handler */}
      <Tabs value={currentTab} onValueChange={handleTabsChange}>
        <div className="w-full">
          <div className="flex items-baseline justify-between border-b pb-6 pt-24">
            <h1 className="text-4xl tracking-tight text-gray-900 font-bold">
              Welcome to onboarding
            </h1>
            {/* Render the tabs list component with the two tabs */}
            <TabsList>
              <TabsTrigger value="candidate">Candidate</TabsTrigger>
              <TabsTrigger value="recruiter">Recruiter</TabsTrigger>
            </TabsList>
          </div>
        </div>
        {/* Render the candidate form content when the current tab is "candidate" */}
        <TabsContent value="candidate">
          <CommonFrom
            formControls={candidateOnboardFormControls}
            buttonText={"onboard as candidate"}
            formData={candidateFormData}
            setFormData={setCandidateFormData}
            isBtnDisabled={!handleCandidateFormValid()}
            handleFileChange={handleFileChange}
            action={createProfile}
          />
        </TabsContent>
        {/* Render the recruiter form content when the current tab is "recruiter" */}
        <TabsContent value="recruiter">
          <CommonFrom
            formControls={recruiterOnboardFormControls}
            buttonText={"onboard as recruiter"}
            formData={recruiterFormData}
            setFormData={setRecruiterFormData}
            isBtnDisabled={!handleRecruiterFormValid()}
            action={createProfile}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OnBoard;

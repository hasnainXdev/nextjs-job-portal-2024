import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-7xl mx-auto">
        <SignUp />
      </div>
    </div>
  );
};

export default SignUpPage;

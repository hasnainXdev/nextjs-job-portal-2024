import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-7xl mx-auto">
        <SignIn />
      </div>
    </div>
  );
};

export default SignInPage;

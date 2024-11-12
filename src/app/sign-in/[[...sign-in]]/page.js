import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="max-w-7xl min-h-screen mx-auto items-center justify-between">
    <SignIn />
    </div>
  );
};

export default SignInPage;

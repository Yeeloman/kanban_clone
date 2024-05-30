import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center mt-44">
      <SignUp path="/sign-up" />
    </div>
)
}
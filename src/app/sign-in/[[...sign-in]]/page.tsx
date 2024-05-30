import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex mt-44 justify-center items-center">
      <SignIn path="/sign-in" />
    </div>
)
}
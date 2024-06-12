import {ClerkProvider, UserButton} from "@clerk/nextjs";

export default function Home() {
  return (
    <ClerkProvider>
      <h1 className="head-text text-left">Home</h1>
      <UserButton afterSignOutUrl="/" />
    </ClerkProvider>
  );
}

"use client"; // Ensure this is at the top of the file
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { SignedIn, useClerk } from "@clerk/nextjs";

function LeftSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk(); // Use useClerk to access Clerk functions

  const handleSignOut = async () => {
    await signOut(); // Sign out the user
    router.push('/sign-in'); // Redirect to sign-in page
  };

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex flex-1 w-full flex-col gap-6 px-6">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`leftsidebar_link ${isActive ? 'bg-primary-500' : ''}`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-light-1 max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>
      <div className="mt-10 px-6">
        <SignedIn>
          <div className='flex cursor-pointer gap-4 p-4' onClick={handleSignOut}>
            <Image
              src='/assets/logout.svg'
              alt='logout'
              width={24}
              height={24}
            />
            <p className="text-light-2 max-lg:hidden">Logout</p>
          </div>
        </SignedIn>
      </div>
    </section>
  );
}

export default LeftSidebar;

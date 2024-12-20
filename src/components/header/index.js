"use client";

import { AlignJustify } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

const Header = ({ user, profileInfo }) => {
  const menuItems = [
    {
      label: "Home",
      path: "/",
      show: true,
    },
    {
      label: "Login",
      path: "/sign-in",
      show: !user,
    },
    {
      label: "Register",
      path: "/sign-up",
      show: !user,
    },
    {
      label: "Jobs",
      path: "/jobs",
      show: user,
    },
    {
      label: "Activity",
      path: "/activity",
      show: profileInfo?.role === "candidate",
    },
    {
      label: "Membership",
      path: "/membership",
      show: profileInfo?.role === "recruiter" ? true : false,
    },
    {
      label: "Account",
      path: "/account",
      show: user,
    },
  ];

  return (
    <div>
      <header className="w-full h-16 flex shrink-0 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="lg:hidden">
              <AlignJustify className="h-6 w-6" />
              <span className="sr-only">Toggle Navigation Menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="left">
            <Link
              href={"/"}
              className="text-2xl mr-6 hidden lg:flex text-[1.8rem] font-bold tracking-tight"
            >
              <h3>JOBSCO</h3>
            </Link>

            <div className="grid gap-2 py-6">
              {menuItems.map((menuItem) =>
                menuItem.show ? (
                  <Link
                    onClick={() => sessionStorage.removeItem("filterParams")}
                    key={menuItem.label}
                    href={menuItem.path}
                    className="flex w-full items-center py-2 text-lg font-semibold"
                  >
                    {menuItem.label}
                  </Link>
                ) : null
              )}

              <UserButton afterSignOutUrl="/" />
            </div>
          </SheetContent>
        </Sheet>
        <Link className="hidden lg:flex mr-6" href={"/"}>
          JOBSCO
        </Link>
        <nav className="ml-auto hidden lg:flex gap-6">
          {menuItems.map((menuItem) =>
            // This line renders a link for each menu item if the show property is true
            menuItem.show ? (
              <Link
                key={menuItem.label}
                className="group inline-flex h-9 w-max items-center rounded-md bg-white px-4 py-2 text-sm font-medium"
                href={menuItem.path}
              >
                {menuItem.label}
              </Link>
            ) : null
          )}

          <UserButton afterSignOutUrl="/" />
        </nav>
      </header>
    </div>
  );
};

export default Header;

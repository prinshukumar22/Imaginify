"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { SignedIn, UserButton, SignedOut } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { navLinks } from "@/constants";

const useViewportWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};

const MobileNav = () => {
  const width = useViewportWidth();
  const pathname = usePathname();

  return (
    <header
      style={{
        display: `${width > 1024 ? "none" : "flex"}`,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: "4rem",
        position: "fixed",
        borderBottomWidth: "4px",
        borderColor: "rgb(67 24 255 / var(1))",
        background: "white",
        padding: "1.25rem",
      }}
    >
      <Link href="/" className="flex items-center gap-2 md:py-2">
        <Image
          src="/assets/images/logo-text.svg"
          alt="logo"
          width={180}
          height={28}
        ></Image>
      </Link>
      <nav className="flex gap-2">
        <SignedIn>
          <UserButton afterSignOutUrl="/"></UserButton>
          <Sheet>
            <SheetTrigger>
              <Image
                src={"/assets/icons/menu.svg"}
                alt="menu"
                width={32}
                height={32}
                className="cursor-pointer"
              ></Image>
            </SheetTrigger>
            <SheetContent className="sheet-content sm:w-64">
              <>
                <Image
                  src={"/assets/images/logo-text.svg"}
                  alt="logo"
                  width={152}
                  height={23}
                ></Image>
                <ul
                  style={{
                    marginTop: "2rem",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    gap: "1.25rem",
                  }}
                >
                  {navLinks.map((link) => {
                    const isActive = link.route === pathname;
                    return (
                      <li
                        key={link.route}
                        className={`${
                          isActive && "gradient-text"
                        }  flex whitespace-nowrap text-dark-700`}
                      >
                        <Link
                          className="sidebar-link cursor-pointer"
                          href={link.route}
                        >
                          <Image
                            src={link.icon}
                            alt="logo"
                            width={24}
                            height={24}
                          ></Image>
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </>
            </SheetContent>
          </Sheet>
        </SignedIn>
        <SignedOut>
          <Button asChild className="button bg-purple-gradient bg-cover">
            <Link href={"/sign-in"}>Login</Link>
          </Button>
        </SignedOut>
      </nav>
    </header>
  );
};

export default MobileNav;

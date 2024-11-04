"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function ActiveLink({ href, children, isSubRoute = true }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const activeStyle = isActive
    ? "bg-neutral-800 text-white hover:bg-neutral-800 hover:text-white"
    : "";
  return (
    <>
      {isSubRoute ? (
        <Link
          href={href}
          className={`hover:bg-neutral-800 hover:text-white p-2 rounded-md  ${activeStyle}`}
        >
          {children}
        </Link>
      ) : (
        <li
          className={`text-md text-neutral hover:text-neutral p-2 rounded-md ${
            isActive ? " bg-blue-100" : " p-0 rounded-none"
          }`}
        >
          <Link href={href}>{children}</Link>
        </li>
      )}
    </>
  );
}

export default ActiveLink;

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
export default function Header() {
  const router = useRouter();
  const navItems = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Create",
      href: "/post/create",
    },
  ];
  return (
    <header className="z-10 border-b bg-background sticky top-0 ">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href={"/"} className="font-bold text-xl">
            Thought Rail
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                id={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <div className="hidden md: block">
            {" "}
            {/*placeholder for search bar*/}
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => router.push("/auth")}
              className="cursor-pointer"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import {Sheet,SheetContent,SheetDescription,SheetTitle,SheetTrigger} from "../ui/sheet";
import NavItems from "./NavItems";
import { ThemeToggle } from "./ThemeToggle";
import Logo from "./Logo";
import CartItems from "./CartItems";
import UserProfile from "./UserProfile";

const Header = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between px-2">
        {/* Logo Section */}
        <Logo className="mr-4 flex-none" />

        {/* Navigation Items (Center aligned for larger screens) */}
        <div className="hidden md:flex flex-1 justify-center">
          <NavItems />
        </div>

        {/* Actions Section */}
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <CartItems />
          <UserProfile />

          {/* Mobile Menu Trigger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-8 w-8" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle className="mt-6 text-center">User Menu</SheetTitle>
              <SheetDescription className="sr-only">
                Navigate through the available pages.
              </SheetDescription>
              <div className="mt-6 flex flex-col space-y-4">
                {/* Pass onClose handler to NavItems */}
                <NavItems
                  className="flex flex-col space-y-4"
                  onItemClick={() => setIsOpen(false)}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export default Header;
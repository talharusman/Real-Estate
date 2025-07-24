"use client"
import { HomeModernIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid"
import {
  Navbar,
  NavbarContent,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@nextui-org/react"
import Link from "next/link"
import React, { type ReactNode } from "react"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { usePathname } from "next/navigation"

interface Props {
  children: ReactNode
}

const Appbar = ({ children }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const { user, isLoading } = useKindeBrowserClient()
  const pathname = usePathname()

  const menuItems = [
    { name: "Home", href: "/" },
    ...(user
      ? [
          { name: "My Properties", href: "/user/properties" },
          { name: "Add Property", href: "/user/properties/add" },
        ]
      : []),
  ]

  // Function to check if a route is active
  const isActiveRoute = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }

    // Special handling for Add Property to prevent conflict with My Properties
    if (href === "/user/properties/add") {
      return pathname.startsWith("/user/properties/add")
    }

    // For My Properties, exclude the add property route
    if (href === "/user/properties") {
      return pathname.startsWith("/user/properties") && !pathname.startsWith("/user/properties/add")
    }

    // For other routes, use normal startsWith logic
    return pathname.startsWith(href)
  }

  // Function to close menu
  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <Navbar className="shadow-md" onMenuOpenChange={setIsMenuOpen} maxWidth="full" isBordered isMenuOpen={isMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
          icon={isMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        />
        <NavbarBrand>
          <Link href={"/"} className="flex items-center text-primary-400 hover:text-primary-600 transition-colors">
            <HomeModernIcon className="w-6 h-6 sm:w-8 md:w-10 lg:w-12" />
            <p className="font-bold text-inherit text-xs sm:text-sm md:text-base lg:text-lg ml-1 sm:ml-2">
              TR Real Estate
            </p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop Navigation */}
      <NavbarContent className="hidden sm:flex gap-2 md:gap-4" justify="center">
        <Link
          href="/"
          className={`transition-colors text-sm md:text-base px-2 py-1 rounded-md ${
            isActiveRoute("/")
              ? "text-primary-600 bg-primary-50 font-semibold"
              : "text-foreground hover:text-primary hover:bg-primary-50"
          }`}
        >
          Home
        </Link>
        {user && (
          <>
            <Link
              href="/user/properties"
              className={`transition-colors text-sm md:text-base px-2 py-1 rounded-md ${
                isActiveRoute("/user/properties")
                  ? "text-primary-600 bg-primary-50 font-semibold"
                  : "text-foreground hover:text-primary hover:bg-primary-50"
              }`}
            >
              My Properties
            </Link>
            <Link
              href="/user/properties/add"
              className={`transition-colors text-sm md:text-base px-2 py-1 rounded-md ${
                isActiveRoute("/user/properties/add")
                  ? "text-primary-600 bg-primary-50 font-semibold"
                  : "text-foreground hover:text-primary hover:bg-primary-50"
              }`}
            >
              Add Property
            </Link>
          </>
        )}
      </NavbarContent>

      <NavbarContent justify="end" className="gap-1 sm:gap-2">
        <div className="hidden sm:block">{children}</div>
        <div className="sm:hidden">
          {/* Mobile version of children with smaller size */}
          <div className="scale-75 sm:scale-90">{children}</div>
        </div>
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="pt-4 sm:pt-6">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              className={`w-full text-base sm:text-lg py-2 transition-colors block rounded-md px-2 ${
                isActiveRoute(item.href)
                  ? "text-primary-600 bg-primary-50 font-semibold"
                  : "text-foreground hover:text-primary hover:bg-primary-50"
              }`}
              href={item.href}
              onClick={closeMenu} // This will close the menu when any item is clicked
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}

        {/* Mobile Auth Section */}
        {!user && !isLoading && (
          <NavbarMenuItem>
            <div className="flex flex-col gap-3 mt-4">
              <Button
                as={Link}
                href="/api/auth/login"
                color="primary"
                className="w-full"
                size="sm"
                onClick={closeMenu} // Close menu when Sign In is clicked
              >
                Sign In
              </Button>
              <Button
                as={Link}
                href="/api/auth/register"
                variant="bordered"
                className="w-full"
                size="sm"
                onClick={closeMenu} // Close menu when Sign Up is clicked
              >
                Sign Up
              </Button>
            </div>
          </NavbarMenuItem>
        )}
      </NavbarMenu>
    </Navbar>
  )
}

export default Appbar

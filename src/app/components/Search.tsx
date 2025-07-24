"use client"
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid"
import { Button, Input } from "@nextui-org/react"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"

interface Searchprops {
  isCompact?: boolean
}

const Search = ({ isCompact = false }: Searchprops) => {
  const { user, isLoading } = useKindeBrowserClient()
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const router = useRouter()

  const handleChange = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams)
    if (query) params.set("query", query)
    else params.delete("query")

    const purpose = searchParams.get("purpose")
    if (purpose) params.set("purpose", purpose)

    router.replace(`${pathName}?${params.toString()}`)
  }, 1000)

  const handlePurposeFilter = (purpose: string | null) => {
    const params = new URLSearchParams(searchParams)

    if (purpose === searchParams.get("purpose")) {
      params.delete("purpose")
    } else if (purpose) {
      params.set("purpose", purpose)
    }

    const query = searchParams.get("query")
    if (query) params.set("query", query)

    router.replace(`${pathName}?${params.toString()}`)
  }

  const activePurpose = searchParams.get("purpose")

  if (isLoading || user) {
    if (isCompact) {
      return (
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full p-2 sm:p-3">
          <Input
            onChange={(e) => handleChange(e.target.value)}
            className="w-full"
            size="sm"
            endContent={<MagnifyingGlassIcon className="w-4 h-4 text-slate-500" />}
            defaultValue={searchParams.get("query") ?? ""}
            placeholder="Search by name or city..."
          />
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              size="sm"
              color={activePurpose === "rent" ? "primary" : "default"}
              variant={activePurpose === "rent" ? "solid" : "bordered"}
              onClick={() => handlePurposeFilter("rent")}
              className="flex-1 sm:flex-none text-xs sm:text-sm"
            >
              Rent
            </Button>
            <Button
              size="sm"
              color={activePurpose === "sale" ? "primary" : "default"}
              variant={activePurpose === "sale" ? "solid" : "bordered"}
              onClick={() => handlePurposeFilter("sale")}
              className="flex-1 sm:flex-none text-xs sm:text-sm"
            >
              Sale
            </Button>
          </div>
        </div>
      )
    }

    return (
      <div className="p-2 sm:p-3 md:p-4 flex flex-col sm:flex-row items-center bg-gradient-to-br from-primary-400 to-secondary-500 gap-3 sm:gap-4">
        <div className="flex-1 flex justify-center w-full sm:w-auto">
          <Input
            onChange={(e) => handleChange(e.target.value)}
            className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl shadow mb-2 sm:mb-4"
            endContent={<MagnifyingGlassIcon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />}
            defaultValue={searchParams.get("query") ?? ""}
            placeholder="Search by property name or city..."
            size="md"
          />
        </div>
        <div className="flex gap-2 sm:gap-3 w-full sm:w-auto justify-center">
          <Button
            color="secondary"
            variant="solid"
            onClick={() => handlePurposeFilter("rent")}
            className={`font-normal text-white text-xs sm:text-sm md:text-base bg-secondary-700 flex-1 sm:flex-none px-3 sm:px-4 ${
              activePurpose === "rent" ? "border-2 border-white" : "border-none"
            }`}
            size="sm"
          >
            For Rent
          </Button>
          <Button
            color="secondary"
            variant="solid"
            onClick={() => handlePurposeFilter("sale")}
            className={`font-normal bg-secondary-700 text-white text-xs sm:text-sm md:text-base  flex-1 sm:flex-none px-3 sm:px-4 ${
              activePurpose === "sale" ? "border-2 border-white" : "border-none"
            }`}
            size="sm"
          >
            For Sale
          </Button>
        </div>
      </div>
    )
  } else {
    return (
      <div className="flex justify-center items-center p-2 sm:p-3 bg-gradient-to-br from-primary-400 to-secondary-500 text-white">
        <p className="text-center text-xs sm:text-sm md:text-base px-2">
          Please{" "}
          <a href="/api/auth/login" className="underline font-bold">
            sign in
          </a>{" "}
          to access all features
        </p>
      </div>
    )
  }
}

export default Search

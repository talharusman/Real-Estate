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

    // Preserve purpose filter if it exists
    const purpose = searchParams.get("purpose")
    if (purpose) params.set("purpose", purpose)

    router.replace(`${pathName}?${params.toString()}`)
  }, 1000)

  const handlePurposeFilter = (purpose: string | null) => {
    const params = new URLSearchParams(searchParams)

    // If the same filter is clicked again, remove it (toggle behavior)
    if (purpose === searchParams.get("purpose")) {
      params.delete("purpose")
    } else if (purpose) {
      params.set("purpose", purpose)
    }

    // Preserve search query if it exists
    const query = searchParams.get("query")
    if (query) params.set("query", query)

    router.replace(`${pathName}?${params.toString()}`)
  }

  const activePurpose = searchParams.get("purpose")

  if ((isLoading || user)) {

    if (isCompact) {
      return (
        <div className="flex items-center gap-2 w-full">
          <Input
            onChange={(e) => handleChange(e.target.value)}
            className="w-full"
            size="sm"
            endContent={<MagnifyingGlassIcon className="w-4 text-slate-500" />}
            defaultValue={searchParams.get("query") ?? ""}
            placeholder="Search by name or city..."
          />
          <Button
            size="sm"
            color={activePurpose === "rent" ? "primary" : "default"}
            variant={activePurpose === "rent" ? "solid" : "bordered"}
            onClick={() => handlePurposeFilter("rent")}
          >
            Rent
          </Button>
          <Button
            size="sm"
            color={activePurpose === "sale" ? "primary" : "default"}
            variant={activePurpose === "sale" ? "solid" : "bordered"}
            onClick={() => handlePurposeFilter("sale")}
          >
            Sale
          </Button>
        </div>
      )
    }

    return (

      <div className="p-1 flex items-center  bg-gradient-to-br from-primary-400 to-secondary-500">
        <div className="flex-1 flex justify-center mt-2 ml-10">
          <Input
            onChange={(e) => handleChange(e.target.value)}
            className="w-96 shadow mb-4"
            endContent={<MagnifyingGlassIcon className="w-4 text-slate-500" />}
            defaultValue={searchParams.get("query") ?? ""}
            placeholder="Search by property name or city..."
          />
        </div>
        <div className="flex gap-1 ">
          <Button
            color={activePurpose === "rent" ? "secondary" : "secondary"}
            variant="solid" // or ghost if using a UI lib that supports it
            onClick={() => handlePurposeFilter("rent")}
            className={`font-normal text-white text-base bg-transparent ${activePurpose === "rent" ? "border-2 border-white" : "border-none"}`}
          >
            For Rent
          </Button>
          <Button
            color={activePurpose === "sale" ? "secondary" : "secondary"}
            variant="solid"
            onClick={() => handlePurposeFilter("sale")}
            className={`font-normal text-white text-base bg-transparent ${activePurpose === "sale" ? "border-2 border-white" : "border-none"}`}
          >
            For Sale
          </Button>


        </div>
      </div>
    )
  }
  else {
    return (
      <div className="flex justify-center items-center p-4 bg-gradient-to-br from-primary-400 to-secondary-500 text-white">
        <p>
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


"use client"

import type { PropsWithChildren } from "react"
import PaginationContainer from "./PaginationContainer"
import NotFoundResults from "./NotFoundResults"
import { useSearchParams, usePathname, useRouter } from "next/navigation"

type Props = PropsWithChildren<{
  totalPages: number
  currentPage: number
  hasResults: boolean
}>

const PropertyContainer = ({ children, currentPage, totalPages, hasResults }: Props) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const query = searchParams.get("query") || ""
  const purpose = searchParams.get("purpose") || ""

  const resetSearch = () => {
    router.push(pathname)
  }

  return (
    <div className="p-2 sm:p-3 md:p-5 lg:p-6 flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-10 items-center">
      {hasResults ? (
        <>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 w-full max-w-7xl">
            {children}
          </div>
          <div className="w-full flex justify-center">
            <PaginationContainer currentPage={currentPage} totalPages={totalPages} />
          </div>
        </>
      ) : (
        <div className="w-full">
          <NotFoundResults searchQuery={query} purpose={purpose} resetSearch={resetSearch} />
        </div>
      )}
    </div>
  )
}

export default PropertyContainer

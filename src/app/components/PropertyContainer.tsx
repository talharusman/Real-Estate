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
    <div className="p-5 flex flex-col gap-10 items-center">
      {hasResults ? (
        <>
          <div className="flex flex-wrap justify-center gap-6">{children}</div>
          <PaginationContainer currentPage={currentPage} totalPages={totalPages} />
        </>
      ) : (
        <NotFoundResults searchQuery={query} purpose={purpose} resetSearch={resetSearch} />
      )}
    </div>
  )
}

export default PropertyContainer

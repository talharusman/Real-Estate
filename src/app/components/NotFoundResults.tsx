"use client"

import { Button } from "@nextui-org/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { MagnifyingGlassIcon, HomeIcon } from "@heroicons/react/24/outline"

interface NotFoundResultsProps {
  searchQuery?: string
  purpose?: string
  resetSearch: () => void
}

const NotFoundResults = ({ searchQuery, purpose, resetSearch }: NotFoundResultsProps) => {
  const router = useRouter()

  const getMessage = () => {
    if (searchQuery && purpose) {
      return `No ${purpose === "rent" ? "rental" : "sale"} properties found matching "${searchQuery}"`
    } else if (searchQuery) {
      return `No properties found matching "${searchQuery}"`
    } else if (purpose) {
      return `No properties available for ${purpose === "rent" ? "rent" : "sale"} at this time`
    } else {
      return "No properties found"
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="relative w-64 h-64 mb-8">
        <Image src="/images/not-found.png" alt="No results found" fill className="object-contain" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{getMessage()}</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        Try adjusting your search criteria or browse our other available properties.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button color="primary" startContent={<MagnifyingGlassIcon className="w-5 h-5" />} onClick={resetSearch}>
          Clear Search Filters
        </Button>
        <Button variant="bordered" startContent={<HomeIcon className="w-5 h-5" />} onClick={() => router.push("/")}>
          Browse All Properties
        </Button>
      </div>
    </div>
  )
}

export default NotFoundResults

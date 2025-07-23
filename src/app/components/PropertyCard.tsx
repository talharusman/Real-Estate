"use client"

import { Card, Image } from "@nextui-org/react"
import type { Prisma } from "@prisma/client"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { useRouter } from "next/navigation"
import type React from "react"

interface Props {
  property: Prisma.PropertyGetPayload<{
    select: {
      id: true
      name: true
      price: true
      purpose: true
      images: {
        select: {
          url: true
        }
      }
      location: {
        select: {
          city: true
          state: true
        }
      }
    }
  }>
}

const PropertyCard = ({ property }: Props) => {
  const { user, isLoading } = useKindeBrowserClient()
  const router = useRouter()

  const handleViewDetails = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    // If user is not logged in, redirect to login page
    if (!user && !isLoading) {
      router.push("/api/auth/login")
      return
    }

    // Otherwise, navigate to property details
    router.push(`/property/${property.id}`)
  }

  return (
    <Card className="w-72 flex flex-col hover:scale-105 cursor-pointer">
      <div className="w-full h-48 overflow-hidden">
        <Image
          radius="none"
          src={property.id === 1 ? property.images[0]?.url : `/images/${Math.floor(Math.random() * 9 + 1)}.jpg`}
          className="object-cover w-full h-full"
          alt={property.name}
        />
      </div>
      <div className="flex flex-col mt-auto">
        <div className="p-4">
          <p className="text-primary-600 text-xl font-bold">{property.name}</p>
          <p className="text-slate-600">
            {property.location?.city}, {property.location?.state}
          </p>
          <span className="inline-block px-2 py-1 text-xs rounded-full bg-primary-100 text-primary-700 mt-1">
            {property.purpose === "rent" ? "For Rent" : "For Sale"}
          </span>
        </div>
        <div className="bg-gradient-to-br from-slate-50 to-slate-200 p-4 flex justify-between">
          <p>${property.price.toLocaleString()}</p>
          <a
            href={`/property/${property.id}`}
            onClick={handleViewDetails}
            className="hover:text-primary-500 transition-colors"
          >
            View Details
          </a>
        </div>
      </div>
    </Card>
  )
}

export default PropertyCard


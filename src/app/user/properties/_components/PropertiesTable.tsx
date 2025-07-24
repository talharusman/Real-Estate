"use client"
import { TrashIcon } from "@heroicons/react/16/solid"
import { EyeIcon, PencilIcon } from "@heroicons/react/16/solid"
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  Card,
  Button,
} from "@nextui-org/react"
import type { Prisma } from "@prisma/client"
import Link from "next/link"
import { useRouter } from "next/navigation"

type Props = {
  properties: Prisma.PropertyGetPayload<{
    include: {
      status: true
      images: true
      type: true
    }
  }>[]
  totalPages: number
  currentPage: number
}

const PropertiesTable = ({ properties, totalPages, currentPage }: Props) => {
  const router = useRouter()

  // Mobile Card View
  const MobilePropertyCard = ({ property }: { property: Props["properties"][0] }) => (
    <Card className="p-3 sm:p-4 mb-3 sm:mb-4">
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-base sm:text-lg text-primary-600 line-clamp-2">{property.name}</h3>
          <p className="text-xs sm:text-sm text-gray-600">{property.type.value}</p>
        </div>

        <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-2">
          <div>
            <p className="font-bold text-base sm:text-lg">${property.price.toLocaleString()}</p>
            <span
              className={`inline-block px-2 py-1 text-xs rounded-full ${
                property.status.value === "For Sale"
                  ? "bg-green-100 text-green-700"
                  : property.status.value === "Sold"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {property.status.value}
            </span>
          </div>
        </div>

        <div className="flex justify-end gap-1 sm:gap-2 pt-2 border-t">
          <Tooltip content="View Details">
            <Button as={Link} href={`/property/${property.id}`} isIconOnly size="sm" variant="light">
              <EyeIcon className="w-4 h-4 text-slate-500" />
            </Button>
          </Tooltip>
          <Tooltip content="Edit Property" color="warning">
            <Button as={Link} href={`/user/properties/${property.id}/edit`} isIconOnly size="sm" variant="light">
              <PencilIcon className="w-4 h-4 text-yellow-500" />
            </Button>
          </Tooltip>
          <Tooltip content="Delete Property" color="danger">
            <Button as={Link} href={`/user/properties/${property.id}/delete`} isIconOnly size="sm" variant="light">
              <TrashIcon className="w-4 h-4 text-red-500" />
            </Button>
          </Tooltip>
        </div>
      </div>
    </Card>
  )

  return (
    <div className="flex flex-col items-center gap-3 sm:gap-4 p-2 sm:p-4">
      {/* Mobile View */}
      <div className="block lg:hidden w-full">
        {properties.length > 0 ? (
          properties.map((property) => <MobilePropertyCard key={property.id} property={property} />)
        ) : (
          <div className="text-center py-6 sm:py-8">
            <p className="text-gray-500 text-sm sm:text-base">No properties found</p>
          </div>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block w-full overflow-x-auto">
        <Table aria-label="Properties table">
          <TableHeader>
            <TableColumn>NAME</TableColumn>
            <TableColumn>PRICE</TableColumn>
            <TableColumn>TYPE</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn>ACTIONS</TableColumn>
          </TableHeader>
          <TableBody>
            {properties.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="max-w-xs">
                    <p className="font-medium truncate">{item.name}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-semibold">${item.price.toLocaleString()}</span>
                </TableCell>
                <TableCell>{item.type.value}</TableCell>
                <TableCell>
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full ${
                      item.status.value === "For Sale"
                        ? "bg-green-100 text-green-700"
                        : item.status.value === "Sold"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.status.value}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Tooltip content="Details">
                      <Link href={`/property/${item.id}`}>
                        <EyeIcon className="w-5 text-slate-500 hover:text-primary-500 transition-colors" />
                      </Link>
                    </Tooltip>
                    <Tooltip content="Edit Property" color="warning">
                      <Link href={`/user/properties/${item.id}/edit`}>
                        <PencilIcon className="w-5 text-yellow-500 hover:text-yellow-600 transition-colors" />
                      </Link>
                    </Tooltip>
                    <Tooltip content="Delete Property" color="danger">
                      <Link href={`/user/properties/${item.id}/delete`}>
                        <TrashIcon className="w-5 text-red-500 hover:text-red-600 transition-colors" />
                      </Link>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="w-full flex justify-center">
          <Pagination
            total={totalPages}
            initialPage={1}
            page={currentPage}
            onChange={(page) => router.push(`/user/properties?pagenum=${page}`)}
            size="sm"
            showControls
            className="mt-2 sm:mt-4"
          />
        </div>
      )}
    </div>
  )
}

export default PropertiesTable

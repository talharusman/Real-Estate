import prisma from "@/lib/prisma"
import PropertyCard from "./components/PropertyCard"
import PropertyContainer from "./components/PropertyContainer"
import Search from "./components/Search"
const PAGE_SIZE = 8

interface Props {
  searchParams: { [key: string]: string | string[] | undefined }
}
export default async function Home({ searchParams }: Props) {
  const pagenum = searchParams.pagenum ?? 0
  const query = searchParams.query ?? ""
  const purpose = searchParams.purpose ?? ""

  const propertiesPromise = prisma.property.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      purpose: true,
      images: {
        select: {
          url: true,
        },
      },
      location: {
        select: {
          city: true,
          state: true,
        },
      },
    },
    where: {
      AND: [
        // Filter by purpose if specified
        ...(purpose ? [{ purpose: String(purpose) }] : []),

        // Search in name or city if query is provided
        ...(query
          ? [
              {
                OR: [{ name: { contains: String(query) } }, { location: { city: { contains: String(query) } } }],
              },
            ]
          : []),
      ],
    },
    skip: +pagenum * PAGE_SIZE,
    take: PAGE_SIZE,
  })

  const totalPropertiesPromise = prisma.property.count({
    where: {
      AND: [
        // Filter by purpose if specified
        ...(purpose ? [{ purpose: String(purpose) }] : []),

        // Search in name or city if query is provided
        ...(query
          ? [
              {
                OR: [{ name: { contains: String(query) } }, { location: { city: { contains: String(query) } } }],
              },
            ]
          : []),
      ],
    },
  })

  const [properties, totalProperties] = await Promise.all([propertiesPromise, totalPropertiesPromise])

  const totalPages = Math.floor(totalProperties / PAGE_SIZE)
  const hasResults = properties.length > 0

  return (
    <div>
      <Search />
      <PropertyContainer totalPages={totalPages} currentPage={+pagenum} hasResults={hasResults}>
        {properties.map((propertyItem) => (
          <PropertyCard property={propertyItem} key={propertyItem.id} />
        ))}
      </PropertyContainer>
    </div>
  )
}

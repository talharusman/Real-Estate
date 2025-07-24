import { ImagesSlider } from "@/app/components/ImageSlider"
import PageTitle from "@/app/components/pageTitle"
import prisma from "@/lib/prisma"
import { Card } from "@nextui-org/react"
import { notFound } from "next/navigation"

const images = [1, 2, 3, 4, 5, 6].map((image) => `/images/${image}.jpg`)

interface Props {
  params: {
    id: string
  }
}

const PropertyPage = async ({ params }: Props) => {
  const property = await prisma.property.findUnique({
    where: {
      id: +params.id,
    },
    include: {
      status: true,
      feature: true,
      location: true,
      contact: true,
      images: true,
    },
  })

  if (!property) return notFound()

  return (
    <div className="min-h-screen">
      <PageTitle title="Property Details" href="/" linkCaption="← Back to Properties" />
      <div className="p-2 sm:p-3 md:p-4 lg:p-6">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-primary my-2 sm:my-3 md:my-5 px-2">
          {property.name}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Image Slider */}
            <div className="h-48 sm:h-64 md:h-80 lg:h-96">
              <ImagesSlider images={images} />
            </div>

            {/* Price and Status */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 md:gap-4 px-2">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-700">
                ${property.price.toLocaleString()} / {property.status.value}
              </h2>
              <span className="inline-block px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full bg-primary-100 text-primary-700 w-fit">
                {property.purpose === "rent" ? "For Rent" : "For Sale"}
              </span>
            </div>

            {/* Description */}
            <div className="px-2">
              <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">Description</h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{property.description}</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-3 sm:p-4 md:p-5 flex flex-col gap-3 sm:gap-4 sticky top-4">
              {/* Features Section */}
              <div>
                <Title title="Features" />
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <Attribute label="Bedrooms" value={property.feature?.bedrooms} />
                  <Attribute label="Bathrooms" value={property.feature?.bathrooms} />
                  <Attribute label="Parking" value={property.feature?.parkingSpots} />
                  <Attribute label="Area (sq ft)" value={property.feature?.area} />
                </div>

                {/* Boolean Features */}
                <div className="mt-3 sm:mt-4 space-y-2">
                  {property.feature?.hasSwimmingPool && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span className="text-xs sm:text-sm text-slate-600">Swimming Pool</span>
                    </div>
                  )}
                  {property.feature?.hasGardenYard && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span className="text-xs sm:text-sm text-slate-600">Garden/Yard</span>
                    </div>
                  )}
                  {property.feature?.hasBalcony && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span className="text-xs sm:text-sm text-slate-600">Balcony</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Address Section */}
              <div className="mt-4 sm:mt-6">
                <Title title="Address" />
                <div className="space-y-2 mt-3">
                  <Attribute label="City" value={property.location?.city} />
                  <Attribute label="State" value={property.location?.state} />
                  <Attribute label="Zip Code" value={property.location?.zip} />
                  <Attribute label="Address" value={property.location?.streetAddress} />
                  <Attribute label="Landmark" value={property.location?.landmark} />
                </div>
              </div>

              {/* Contact Section */}
              <div className="mt-4 sm:mt-6">
                <Title title="Contact Owner" />
                <div className="space-y-2 mt-3">
                  <Attribute label="Name" value={property.contact?.name} />
                  <Attribute label="Email" value={property.contact?.email} />
                  <Attribute label="Phone" value={property.contact?.phone} />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyPage

const Title = ({ title, className }: { title: string; className?: string }) => (
  <div className={className}>
    <h3 className="text-base sm:text-lg font-bold text-slate-700">{title}</h3>
    <hr className="border border-solid border-slate-300 mt-1" />
  </div>
)

const Attribute = ({ label, value }: { label: string; value?: string | number }) => (
  <div className="flex justify-between items-start">
    <span className="text-xs sm:text-sm text-slate-600 font-medium">{label}:</span>
    <span className="text-xs sm:text-sm text-slate-800 text-right flex-1 ml-2">{value || "N/A"}</span>
  </div>
)

"use client"

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid"
import { Button, Card, Input, cn } from "@nextui-org/react"
import { useFormContext } from "react-hook-form"
import type { AddPropertyInputType } from "./AddPropertyForm"

interface Props {
  next: () => void
  prev: () => void
  className?: string
}
const Location = (props: Props) => {
  const {
    register,
    formState: { errors },
    trigger,
    getValues,
  } = useFormContext<AddPropertyInputType>()

  const handleNext = async () => {
    if (
      await trigger([
        "location.streetAddress",
        "location.city",
        "location.state",
        "location.zip",
        "location.region",
        "location.landmark",
      ])
    )
      props.next()
  }

  return (
    <Card className={cn("p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6", props.className)}>
      {/* Street Address - Full Width */}
      <div className="w-full">
        <Input
          {...register("location.streetAddress")}
          errorMessage={errors.location?.streetAddress?.message}
          isInvalid={!!errors.location?.streetAddress}
          label="Street Address"
          name="location.streetAddress"
          defaultValue={getValues("location.streetAddress") || ""}
          size="md"
        />
      </div>

      {/* City and State - Mobile: Stack, Desktop: Side by side */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <Input
          {...register("location.city")}
          errorMessage={errors.location?.city?.message}
          isInvalid={!!errors.location?.city}
          label="City"
          name="location.city"
          defaultValue={getValues("location.city") || ""}
          size="md"
        />

        <Input
          {...register("location.state")}
          errorMessage={errors.location?.state?.message}
          isInvalid={!!errors.location?.state}
          label="State"
          name="location.state"
          defaultValue={getValues("location.state") || ""}
          size="md"
        />
      </div>

      {/* Zip and Region - Mobile: Stack, Desktop: Side by side */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <Input
          {...register("location.zip")}
          errorMessage={errors.location?.zip?.message}
          isInvalid={!!errors.location?.zip}
          label="ZIP Code"
          name="location.zip"
          defaultValue={getValues("location.zip") || ""}
          size="md"
        />

        <Input
          {...register("location.region")}
          errorMessage={errors.location?.region?.message}
          isInvalid={!!errors.location?.region}
          label="Region"
          name="location.region"
          defaultValue={getValues("location.region") || ""}
          size="md"
        />
      </div>

      {/* Landmark - Full Width */}
      <div className="w-full">
        <Input
          {...register("location.landmark")}
          errorMessage={errors.location?.landmark?.message}
          isInvalid={!!errors.location?.landmark}
          label="Landmark"
          name="location.landmark"
          defaultValue={getValues("location.landmark") || ""}
          size="md"
        />
      </div>

      {/* Navigation Buttons - Previous Left, Next Right */}
      <div className="flex justify-between gap-3 sm:gap-4 pt-4 sm:pt-6">
        <Button
          onClick={props.prev}
          startContent={<ChevronLeftIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
          color="primary"
          className="flex-1 sm:w-36 sm:flex-none"
          size="md"
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          endContent={<ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
          color="primary"
          className="flex-1 sm:w-36 sm:flex-none"
          size="md"
        >
          Next
        </Button>
      </div>
    </Card>
  )
}

export default Location

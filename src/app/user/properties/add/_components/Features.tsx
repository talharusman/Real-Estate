"use client"

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid"
import { Button, Card, Checkbox, Input, cn } from "@nextui-org/react"
import { Controller, useFormContext } from "react-hook-form"
import type { AddPropertyInputType } from "./AddPropertyForm"

interface Props {
  next: () => void
  prev: () => void
  className?: string
}
const Features = (props: Props) => {
  const {
    register,
    formState: { errors },
    control,
    trigger,
    getValues,
  } = useFormContext<AddPropertyInputType>()

  const handleNext = async () => {
    if (
      await trigger([
        "propertyFeature.area",
        "propertyFeature.bathrooms",
        "propertyFeature.bedrooms",
        "propertyFeature.parkingSpots",
      ])
    )
      props.next()
  }

  return (
    <Card className={cn("p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6", props.className)}>
      {/* Bedrooms and Bathrooms - Mobile: Stack, Desktop: Side by side */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <Input
          {...register("propertyFeature.bedrooms", { setValueAs: (v: any) => Number.parseInt(v) })}
          errorMessage={errors.propertyFeature?.bedrooms?.message}
          isInvalid={!!errors.propertyFeature?.bedrooms}
          label="Bedrooms"
          type="number"
          defaultValue={getValues("propertyFeature.bedrooms")?.toString() || "1"}
          size="md"
          min="0"
        />

        <Input
          {...register("propertyFeature.bathrooms", { setValueAs: (v: any) => Number.parseInt(v) })}
          errorMessage={errors.propertyFeature?.bathrooms?.message}
          isInvalid={!!errors.propertyFeature?.bathrooms}
          label="Bathrooms"
          type="number"
          defaultValue={getValues("propertyFeature.bathrooms")?.toString() || "1"}
          size="md"
          min="0"
        />
      </div>

      {/* Parking and Area - Mobile: Stack, Desktop: Side by side */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <Input
          {...register("propertyFeature.parkingSpots", { setValueAs: (v: any) => Number.parseInt(v) })}
          errorMessage={errors.propertyFeature?.parkingSpots?.message}
          isInvalid={!!errors.propertyFeature?.parkingSpots}
          label="Parking Spots"
          type="number"
          defaultValue={getValues("propertyFeature.parkingSpots")?.toString() || "0"}
          size="md"
          min="0"
        />

        <Input
          {...register("propertyFeature.area", { setValueAs: (v: any) => Number.parseInt(v) })}
          errorMessage={errors.propertyFeature?.area?.message}
          isInvalid={!!errors.propertyFeature?.area}
          label="Area (sq ft)"
          type="number"
          defaultValue={getValues("propertyFeature.area")?.toString() || "0"}
          size="md"
          min="0"
        />
      </div>

      {/* Amenities Checkboxes - Mobile: Stack, Desktop: Grid */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700">Property Amenities</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <Controller
            control={control}
            name="propertyFeature.hasSwimmingPool"
            defaultValue={false}
            render={({ field }) => (
              <Checkbox isSelected={field.value} onValueChange={field.onChange} onBlur={field.onBlur} size="md">
                Swimming Pool
              </Checkbox>
            )}
          />

          <Controller
            control={control}
            name="propertyFeature.hasGardenYard"
            defaultValue={false}
            render={({ field }) => (
              <Checkbox isSelected={field.value} onValueChange={field.onChange} onBlur={field.onBlur} size="md">
                Garden/Yard
              </Checkbox>
            )}
          />

          <Controller
            control={control}
            name="propertyFeature.hasBalcony"
            defaultValue={false}
            render={({ field }) => (
              <Checkbox isSelected={field.value} onValueChange={field.onChange} onBlur={field.onBlur} size="md">
                Balcony/Patio
              </Checkbox>
            )}
          />
        </div>
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

export default Features

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
    <Card className={cn("p-2 grid grid-cols-1 md:grid-cols-2 gap-3", props.className)}>
      <Input
        {...register("propertyFeature.bedrooms", { setValueAs: (v: any) => Number.parseInt(v) })}
        errorMessage={errors.propertyFeature?.bedrooms?.message}
        isInvalid={!!errors.propertyFeature?.bedrooms}
        label="Bedrooms"
        type="number"
        defaultValue={getValues("propertyFeature.bedrooms")?.toString() || "1"}
      />

      <Input
        {...register("propertyFeature.bathrooms", { setValueAs: (v: any) => Number.parseInt(v) })}
        errorMessage={errors.propertyFeature?.bathrooms?.message}
        isInvalid={!!errors.propertyFeature?.bathrooms}
        label="Bathrooms"
        type="number"
        defaultValue={getValues("propertyFeature.bathrooms")?.toString() || "1"}
      />

      <Input
        {...register("propertyFeature.parkingSpots", { setValueAs: (v: any) => Number.parseInt(v) })}
        errorMessage={errors.propertyFeature?.parkingSpots?.message}
        isInvalid={!!errors.propertyFeature?.parkingSpots}
        label="Parking Spots"
        type="number"
        defaultValue={getValues("propertyFeature.parkingSpots")?.toString() || "0"}
      />

      <Input
        {...register("propertyFeature.area", { setValueAs: (v: any) => Number.parseInt(v) })}
        errorMessage={errors.propertyFeature?.area?.message}
        isInvalid={!!errors.propertyFeature?.area}
        label="Area"
        type="number"
        defaultValue={getValues("propertyFeature.area")?.toString() || "0"}
      />

      <div className="flex items-center justify-between">
        <Controller
          control={control}
          name="propertyFeature.hasSwimmingPool"
          defaultValue={false}
          render={({ field }) => (
            <Checkbox isSelected={field.value} onValueChange={field.onChange} onBlur={field.onBlur}>
              Has Swimming Pool
            </Checkbox>
          )}
        />

        <Controller
          control={control}
          name="propertyFeature.hasGardenYard"
          defaultValue={false}
          render={({ field }) => (
            <Checkbox isSelected={field.value} onValueChange={field.onChange} onBlur={field.onBlur}>
              Has Garden/Yard
            </Checkbox>
          )}
        />

        <Controller
          control={control}
          name="propertyFeature.hasBalcony"
          defaultValue={false}
          render={({ field }) => (
            <Checkbox isSelected={field.value} onValueChange={field.onChange} onBlur={field.onBlur}>
              Has Balcony/Patio
            </Checkbox>
          )}
        />
      </div>

      <div className="flex justify-center col-span-2 gap-3">
        <Button
          onClick={props.prev}
          startContent={<ChevronLeftIcon className="w-6" />}
          color="primary"
          className="w-36"
        >
          Previous
        </Button>
        <Button onClick={handleNext} endContent={<ChevronRightIcon className="w-6" />} color="primary" className="w-36">
          Next
        </Button>
      </div>
    </Card>
  )
}

export default Features

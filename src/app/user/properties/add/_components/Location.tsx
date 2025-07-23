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
    <Card className={cn("p-2 grid grid-cols-1 md:grid-cols-3 gap-3", props.className)}>
      <Input
        {...register("location.streetAddress")}
        errorMessage={errors.location?.streetAddress?.message}
        isInvalid={!!errors.location?.streetAddress}
        label="Street Address"
        name="location.streetAddress"
        defaultValue={getValues("location.streetAddress") || ""}
      />

      <Input
        {...register("location.city")}
        errorMessage={errors.location?.city?.message}
        isInvalid={!!errors.location?.city}
        label="City"
        name="location.city"
        defaultValue={getValues("location.city") || ""}
      />

      <Input
        {...register("location.state")}
        errorMessage={errors.location?.state?.message}
        isInvalid={!!errors.location?.state}
        label="State"
        name="location.state"
        defaultValue={getValues("location.state") || ""}
      />

      <Input
        {...register("location.zip")}
        errorMessage={errors.location?.zip?.message}
        isInvalid={!!errors.location?.zip}
        label="Zip"
        name="location.zip"
        defaultValue={getValues("location.zip") || ""}
      />

      <Input
        {...register("location.region")}
        errorMessage={errors.location?.region?.message}
        isInvalid={!!errors.location?.region}
        label="Region"
        name="location.region"
        defaultValue={getValues("location.region") || ""}
      />

      <Input
        {...register("location.landmark")}
        errorMessage={errors.location?.landmark?.message}
        isInvalid={!!errors.location?.landmark}
        label="Landmark"
        name="location.landmark"
        defaultValue={getValues("location.landmark") || ""}
      />

      <div className="flex justify-center col-span-3 gap-3">
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

export default Location

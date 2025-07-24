"use client"

import { ChevronLeftIcon, PlusCircleIcon } from "@heroicons/react/16/solid"
import { Button, Card, Input, cn } from "@nextui-org/react"
import { useFormContext } from "react-hook-form"
import type { AddPropertyInputType } from "./AddPropertyForm"

interface Props {
  prev: () => void
  className?: string
}
const Contact = ({ prev, className }: Props) => {
  const {
    register,
    formState: { errors },
    getValues,
  } = useFormContext<AddPropertyInputType>()

  return (
    <Card className={cn("p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6", className)}>
      {/* Contact Name - Full Width */}
      <div className="w-full">
        <Input
          {...register("contact.name")}
          errorMessage={errors.contact?.name?.message}
          isInvalid={!!errors.contact?.name}
          label="Contact Name"
          defaultValue={getValues("contact.name") || ""}
          size="md"
        />
      </div>

      {/* Phone and Email - Mobile: Stack, Desktop: Side by side */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <Input
          {...register("contact.phone")}
          errorMessage={errors.contact?.phone?.message}
          isInvalid={!!errors.contact?.phone}
          label="Phone Number"
          defaultValue={getValues("contact.phone") || ""}
          size="md"
          type="tel"
        />

        <Input
          {...register("contact.email")}
          errorMessage={errors.contact?.email?.message}
          isInvalid={!!errors.contact?.email}
          label="Email Address"
          defaultValue={getValues("contact.email") || ""}
          size="md"
          type="email"
        />
      </div>

      {/* Navigation Buttons - Previous Left, Save Right */}
      <div className="flex justify-between gap-3 sm:gap-4 pt-4 sm:pt-6">
        <Button
          onClick={prev}
          startContent={<ChevronLeftIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
          color="primary"
          className="flex-1 sm:w-36 sm:flex-none"
          size="md"
        >
          Previous
        </Button>
        <Button
          endContent={<PlusCircleIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
          color="secondary"
          className="flex-1 sm:w-36 sm:flex-none"
          type="submit"
          size="md"
        >
          Save Property
        </Button>
      </div>
    </Card>
  )
}

export default Contact

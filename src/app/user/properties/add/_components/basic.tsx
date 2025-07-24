"use client"

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid"
import { Button, Card, Input, Radio, RadioGroup, Select, SelectItem, Textarea, cn } from "@nextui-org/react"
import type { PropertyStatus, PropertyType } from "@prisma/client"
import { useFormContext } from "react-hook-form"
import type { AddPropertyInputType } from "./AddPropertyForm"

interface Props {
  className?: string
  types: PropertyType[]
  statuses: PropertyStatus[]
  next: () => void
}
const Basic = (props: Props) => {
  const {
    register,
    formState: { errors },
    trigger,
    getValues,
    setValue,
    watch,
  } = useFormContext<AddPropertyInputType>()

  const purpose = watch("purpose")

  const handleNext = async () => {
    if (await trigger(["name", "description", "typeId", "statusId", "price", "purpose"])) props.next()
  }

  return (
    <Card className={cn("p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6", props.className)}>
      {/* Property Name - Full Width */}
      <div className="w-full">
        <Input
          {...register("name")}
          errorMessage={errors.name?.message}
          isInvalid={!!errors.name}
          label="Property Name"
          name="name"
          defaultValue={getValues("name") || ""}
          size="md"
          className="w-full"
        />
      </div>

      {/* Description - Full Width */}
      <div className="w-full">
        <Textarea
          {...register("description")}
          errorMessage={errors.description?.message}
          isInvalid={!!errors.description}
          label="Description"
          name="description"
          defaultValue={getValues("description") || ""}
          minRows={3}
          className="w-full"
        />
      </div>

      {/* Type and Status - Mobile: Stack, Desktop: Side by side */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <Select
          {...register("typeId", { setValueAs: (v: any) => Number.parseInt(v) })}
          errorMessage={errors.typeId?.message}
          isInvalid={!!errors.typeId}
          label="Property Type"
          selectionMode="single"
          name="typeId"
          defaultSelectedKeys={[getValues("typeId")?.toString() || "1"]}
          size="md"
        >
          {props.types.map((item) => (
            <SelectItem key={item.id.toString()} value={item.id}>
              {item.value}
            </SelectItem>
          ))}
        </Select>

        <Select
          {...register("statusId", { setValueAs: (v: any) => Number.parseInt(v) })}
          errorMessage={errors.statusId?.message}
          isInvalid={!!errors.statusId}
          label="Property Status"
          selectionMode="single"
          name="statusId"
          defaultSelectedKeys={[getValues("statusId")?.toString() || "1"]}
          size="md"
        >
          {props.statuses.map((item) => (
            <SelectItem key={item.id.toString()} value={item.id}>
              {item.value}
            </SelectItem>
          ))}
        </Select>
      </div>

      {/* Price - Full Width on Mobile, Half on Desktop */}
      <div className="w-full sm:w-1/2">
        <Input
          {...register("price", { setValueAs: (v: any) => Number.parseInt(v) })}
          errorMessage={errors.price?.message}
          isInvalid={!!errors.price}
          label="Price ($)"
          name="price"
          type="number"
          defaultValue={getValues("price")?.toString() || "0"}
          size="md"
          startContent={<span className="text-gray-500">$</span>}
        />
      </div>

      {/* Property Purpose - Radio Group */}
      <div className="w-full space-y-3">
        <label className="text-sm font-medium text-gray-700">Property Purpose</label>
        <RadioGroup
          orientation="horizontal"
          value={purpose}
          onValueChange={(value) => setValue("purpose", value as "sale" | "rent")}
          defaultValue="sale"
          className="flex flex-row gap-4 sm:gap-6"
        >
          <Radio value="sale" size="md">
            For Sale
          </Radio>
          <Radio value="rent" size="md">
            For Rent
          </Radio>
        </RadioGroup>
        {errors.purpose && <p className="text-danger text-xs mt-1">{errors.purpose.message}</p>}
      </div>

      {/* Navigation Buttons - Previous Left, Next Right */}
      <div className="flex justify-between gap-3 sm:gap-4 pt-4 sm:pt-6">
        <Button
          isDisabled
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

export default Basic

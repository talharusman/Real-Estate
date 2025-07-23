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
    <Card className={cn("p-2 gap-3 grid grid-cols-1 md:grid-cols-3", props.className)}>
      <Input
        {...register("name")}
        errorMessage={errors.name?.message}
        isInvalid={!!errors.name}
        label="Name"
        className="md:col-span-3"
        name="name"
        defaultValue={getValues("name") || ""}
      />
      <Textarea
        {...register("description")}
        errorMessage={errors.description?.message}
        isInvalid={!!errors.description}
        label="Description"
        className="md:col-span-3"
        name="description"
        defaultValue={getValues("description") || ""}
      />

      <Select
        {...register("typeId", { setValueAs: (v: any) => Number.parseInt(v) })}
        errorMessage={errors.typeId?.message}
        isInvalid={!!errors.typeId}
        label="Type"
        selectionMode="single"
        name="typeId"
        defaultSelectedKeys={[getValues("typeId")?.toString() || "1"]}
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
        label="Status"
        selectionMode="single"
        name="statusId"
        defaultSelectedKeys={[getValues("statusId")?.toString() || "1"]}
      >
        {props.statuses.map((item) => (
          <SelectItem key={item.id.toString()} value={item.id}>
            {item.value}
          </SelectItem>
        ))}
      </Select>
      <Input
        {...register("price", { setValueAs: (v: any) => Number.parseInt(v) })}
        errorMessage={errors.price?.message}
        isInvalid={!!errors.price}
        label="Price"
        name="price"
        type="number"
        defaultValue={getValues("price")?.toString() || "0"}
      />

      <div className="md:col-span-3 mt-2">
        <RadioGroup
          label="Property Purpose"
          orientation="horizontal"
          value={purpose}
          onValueChange={(value) => setValue("purpose", value)}
          defaultValue="sale"
        >
          <Radio value="sale">For Sale</Radio>
          <Radio value="rent">For Rent</Radio>
        </RadioGroup>
        {errors.purpose && <p className="text-danger text-xs mt-1">{errors.purpose.message}</p>}
      </div>

      <div className="flex justify-center col-span-3 gap-3">
        <Button isDisabled startContent={<ChevronLeftIcon className="w-6" />} color="primary" className="w-36">
          Previous
        </Button>
        <Button onClick={handleNext} endContent={<ChevronRightIcon className="w-6" />} color="primary" className="w-36">
          Next
        </Button>
      </div>
    </Card>
  )
}

export default Basic

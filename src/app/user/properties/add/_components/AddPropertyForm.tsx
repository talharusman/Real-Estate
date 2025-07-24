"use client"
import { useState } from "react"
import Stepper from "./Stepper"
import Basic from "./basic"
import type { Prisma, PropertyImage, PropertyStatus, PropertyType } from "@prisma/client"
import { cn } from "@nextui-org/react"
import Location from "./Location"
import Features from "./Features"
import Picture from "./Picture"
import Contact from "./Contact"
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form"
import type { z } from "zod"
import { AddPropertyFormSchema } from "@/lib/zodSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { uploadImages } from "@/lib/upload"
import { editProperty, saveProperty } from "@/lib/actions/property"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

const steps = [
  {
    label: "Basic",
  },
  {
    label: "Location",
  },
  {
    label: "Features",
  },
  {
    label: "Pictures",
  },
  {
    label: "Contact",
  },
]

interface Props {
  types: PropertyType[]
  statuses: PropertyStatus[]
  property?: Prisma.PropertyGetPayload<{
    include: {
      location: true
      contact: true
      feature: true
      images: true
    }
  }>
  isEdit?: boolean
}

export type AddPropertyInputType = z.infer<typeof AddPropertyFormSchema>

const AddPropertyForm = ({ isEdit = false, ...props }: Props) => {
  const router = useRouter()
  const methods = useForm<AddPropertyInputType>({
    resolver: zodResolver(AddPropertyFormSchema),
    defaultValues: {
      contact: props.property?.contact ?? {
        name: "",
        email: "",
        phone: "",
      },
      location: props.property?.location ?? {
        streetAddress: "",
        city: "",
        state: "",
        zip: "",
        region: "",
        landmark: "",
      },
      propertyFeature: props.property?.feature ?? {
        bedrooms: 1,
        bathrooms: 1,
        parkingSpots: 0,
        area: 0,
        hasSwimmingPool: false,
        hasGardenYard: false,
        hasBalcony: false,
      },
      description: props.property?.description ?? "",
      name: props.property?.name ?? "",
      price: props.property?.price ?? 0,
      statusId: props.property?.statusId ?? 1,
      typeId: props.property?.typeId ?? 1,
      purpose: props.property?.purpose ?? "sale",
    },
  })
  const [images, setImages] = useState<File[]>([])
  const [savedImagesUrl, setSavedImagesUrl] = useState<PropertyImage[]>(props.property?.images ?? [])

  const [step, setStep] = useState(0)

  const { user } = useKindeBrowserClient()

  const onSubmit: SubmitHandler<AddPropertyInputType> = async (data) => {
    console.log({ data })
    const imageUrls = await uploadImages(images)

    try {
      if (isEdit && props.property) {
        const deletedImageIDs = props.property?.images
          .filter((item) => !savedImagesUrl.includes(item))
          .map((item) => item.id)

        await editProperty(props.property?.id, data, imageUrls, deletedImageIDs)

        toast.success("Property Updated!")
      } else {
        await saveProperty(data, imageUrls, user?.id!)

        toast.success("Property Added!")
      }
    } catch (error) {
      console.error({ error })
    } finally {
      router.push("/user/properties")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-2 sm:py-4 px-2 sm:px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 md:p-6">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-4 sm:mb-6 text-gray-800">
            {isEdit ? "Edit Property" : "Add New Property"}
          </h1>

          <div className="mb-4 sm:mb-6">
            <Stepper className="px-1 sm:px-2" items={steps} activeItem={step} setActiveItem={setStep} />
          </div>

          <FormProvider {...methods}>
            <form
              className="mt-3 space-y-4"
              onSubmit={methods.handleSubmit(onSubmit, (errors) => console.log({ errors }))}
            >
              <div className="min-h-[400px] sm:min-h-[300px]">
                <Basic
                  className={cn({ hidden: step !== 0 })}
                  next={() => setStep((prev) => prev + 1)}
                  types={props.types}
                  statuses={props.statuses}
                />
                <Location
                  next={() => setStep((prev) => prev + 1)}
                  prev={() => setStep((prev) => prev - 1)}
                  className={cn({ hidden: step !== 1 })}
                />
                <Features
                  next={() => setStep((prev) => prev + 1)}
                  prev={() => setStep((prev) => prev - 1)}
                  className={cn({ hidden: step !== 2 })}
                />
                <Picture
                  next={() => setStep((prev) => prev + 1)}
                  prev={() => setStep((prev) => prev - 1)}
                  className={cn({ hidden: step !== 3 })}
                  images={images}
                  setImages={setImages}
                  {...(props.property! && {
                    savedImagesUrl: savedImagesUrl,
                    setSavedImageUrl: setSavedImagesUrl,
                  })}
                />

                <Contact prev={() => setStep((prev) => prev - 1)} className={cn({ hidden: step !== 4 })} />
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  )
}

export default AddPropertyForm

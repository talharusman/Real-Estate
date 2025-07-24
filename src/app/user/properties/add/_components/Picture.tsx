"use client"

import FileInput from "@/app/components/fileUpload"
import { Button, Card, cn } from "@nextui-org/react"
import PictureCard from "./PictureCard"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid"
import type { PropertyImage } from "@prisma/client"

interface Props {
  next: () => void
  prev: () => void
  className?: string
  images: File[]
  setImages: (images: File[]) => void
  savedImagesUrl?: PropertyImage[]
  setSavedImageUrl?: (propertyImages: PropertyImage[]) => void
}

const Picture = (props: Props) => {
  return (
    <Card className={cn("p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6", props.className)}>
      {/* File Upload Section */}
      <div className="w-full">
        <label className="text-sm font-medium text-gray-700 mb-2 block">Property Images</label>
        <FileInput
          onSelect={(e) => props.setImages([(e as any).target.files[0], ...props.images])}
          className="w-full"
        />
      </div>

      {/* Images Grid */}
      <div className="w-full">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {/* Saved Images */}
          {props.savedImagesUrl! &&
            props.setSavedImageUrl! &&
            props.savedImagesUrl.map((image, index) => {
              return (
                <PictureCard
                  key={image.id}
                  src={image.url}
                  index={index}
                  onDelete={(i) =>
                    props.setSavedImageUrl! &&
                    props.setSavedImageUrl(props.savedImagesUrl!.filter((img) => img.id !== image.id))
                  }
                />
              )
            })}

          {/* New Images */}
          {props.images.map((image, index) => {
            const srcUrl = URL.createObjectURL(image)
            return (
              <PictureCard
                key={srcUrl}
                src={srcUrl}
                index={index}
                onDelete={(i) => props.setImages([...props.images.slice(0, i), ...props.images.slice(i + 1)])}
              />
            )
          })}
        </div>

        {/* No Images Message */}
        {props.images.length === 0 && (!props.savedImagesUrl || props.savedImagesUrl.length === 0) && (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">No images uploaded yet. Click "Upload File" to add property images.</p>
          </div>
        )}
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
          onClick={props.next}
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

export default Picture

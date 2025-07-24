"use client"

import { TrashIcon } from "@heroicons/react/16/solid"
import { Card, Image } from "@nextui-org/react"

interface Props {
  src: string
  index: number
  onDelete: (index: number) => void
}
const PictureCard = ({ src, onDelete, index }: Props) => {
  return (
    <Card className="flex flex-col items-center p-2 hover:shadow-md transition-shadow">
      <div className="w-full aspect-square overflow-hidden rounded-lg mb-2">
        <Image
          src={src || "/placeholder.svg"}
          className="w-full h-full object-cover"
          alt={`Property image ${index + 1}`}
        />
      </div>
      <button
        className="p-1 hover:bg-red-50 rounded-full transition-colors"
        onClick={() => onDelete(index)}
        type="button"
      >
        <TrashIcon className="text-danger-400 w-4 h-4" />
      </button>
    </Card>
  )
}

export default PictureCard

import { cn } from "@nextui-org/react"
import React from "react"

interface Props {
  items: { label: string }[]
  activeItem: number
  setActiveItem: (index: number) => void
  className?: string
}

const Stepper = (props: Props) => {
  return (
    <div className={cn("flex items-center justify-between overflow-x-auto pb-2 px-1", props.className)}>
      {props.items.map((item, index) => (
        <React.Fragment key={`step-${index}`}>
          <div className="flex flex-col items-center min-w-0 flex-shrink-0">
            <div
              className={cn(
                "rounded-full w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex justify-center items-center transition text-xs sm:text-sm md:text-base font-medium",
                {
                  "bg-primary-400 text-white": index === props.activeItem,
                  "bg-gray-400 text-white": index > props.activeItem,
                  "bg-primary-700 text-white": index < props.activeItem,
                  "cursor-pointer": index <= props.activeItem,
                },
              )}
              {...(index < props.activeItem ? { onClick: () => props.setActiveItem(index) } : {})}
            >
              {index + 1}
            </div>
            <p className="text-xs sm:text-sm mt-1 text-center whitespace-nowrap px-1">{item.label}</p>
          </div>
          {index !== props.items.length - 1 && (
            <div
              key={`divider-${index}`}
              className={cn(
                "border-t-2 h-0 flex-1 mx-1 sm:mx-2 md:mx-4 relative after:absolute after:left-0 after:top-0 after:border-t-2 after:transition-all after:duration-300 after:ease-in",
                {
                  "after:w-full after:border-primary-400": index < props.activeItem,
                  "after:w-0": index >= props.activeItem,
                },
              )}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default Stepper

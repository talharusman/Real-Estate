import Link from "next/link"
interface Props {
  title?: string
  href?: string
  linkCaption?: string
  compact?: boolean // New prop for smaller height
}
const PageTitle = (props: Props) => {
  return (
    <div
      className={`bg-gradient-to-br from-primary-400 to-secondary-500 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 ${
        props.compact
          ? "p-1 sm:p-2 md:p-3" // Smaller padding for compact mode
          : "p-2 sm:p-3 md:p-4" // Default padding
      }`}
    >
      <h1
        className={`text-white font-medium ${
          props.compact
            ? "text-sm sm:text-base md:text-lg" // Smaller text for compact mode
            : "text-base sm:text-lg md:text-xl" // Default text size
        }`}
      >
        {props.title}
      </h1>
      {props.href && (
        <Link
          className={`text-white hover:text-gray-300 transition-colors ${
            props.compact
              ? "text-xs sm:text-sm md:text-base" // Smaller link text for compact mode
              : "text-xs sm:text-sm md:text-base" // Default link text size
          }`}
          href={props.href}
        >
          {props.linkCaption}
        </Link>
      )}
    </div>
  )
}

export default PageTitle

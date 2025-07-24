import { NoSymbolIcon } from "@heroicons/react/24/outline"
import PageTitle from "@/app/components/pageTitle"

function UnauthorizedPage() {
  return (
    <div>
      <PageTitle title="Access Denied" href="/" linkCaption="← Back to Home" />
      <div className="h-screen flex flex-col items-center justify-center px-4">
        <NoSymbolIcon className="w-24 sm:w-32 md:w-36 text-red-600 mb-4" />
        <p className="capitalize text-center text-sm sm:text-base md:text-lg text-gray-700">
          You are not authorized to perform this action
        </p>
        <p className="text-center text-xs sm:text-sm text-gray-500 mt-2">
          Please contact support if you believe this is an error.
        </p>
      </div>
    </div>
  )
}

export default UnauthorizedPage

import PageTitle from "@/app/components/pageTitle"
import prisma from "@/lib/prisma"
import type { SubscriptionPlan } from "@prisma/client"
import PurchasePlan from "./_components/PurchasePlan"
import { Card } from "@nextui-org/react"

const SubscriptionPage = async () => {
  const subscriptionPlansPromise = prisma.subscriptionPlan.findMany()
  const [subscriptionPlans] = await Promise.all([subscriptionPlansPromise])

  return (
    <div className="min-h-screen bg-gray-50">
      <PageTitle title="Choose Your Plan" href="/" linkCaption="← Back to Home" />

      <div className="p-2 sm:p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Subscription Plans
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto px-2">
              Choose the perfect plan for your real estate business. Upgrade or downgrade at any time.
            </p>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {subscriptionPlans.map((plan, index) => (
              <Plan key={plan.id} plan={plan} isPopular={index === 1} />
            ))}
          </div>

          {/* FAQ or Additional Info */}
          <div className="mt-8 sm:mt-12 md:mt-16 text-center">
            <p className="text-gray-600 text-xs sm:text-sm px-2">
              Need help choosing?{" "}
              <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionPage

const Plan = ({ plan, isPopular = false }: { plan: SubscriptionPlan; isPopular?: boolean }) => {
  return (
    <Card
      className={`relative p-4 sm:p-6 md:p-8 flex flex-col justify-between h-full transition-all duration-200 hover:shadow-lg ${
        isPopular ? "border-2 border-primary-500 shadow-lg" : "border border-gray-200"
      }`}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute top-2 sm:top-2 left-1/2 transform -translate-x-1/2">
          <span className="bg-primary-500 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}

      <div>
        {/* Plan Header */}
        <div className="text-center mb-0 sm:mb-6">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-primary-600 mb-0 mt-4 sm:mt-0">{plan.name}</h3>
          <div className="mb-3 sm:mb-4">
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">${plan.price}</span>
            {plan.price > 0 && <span className="text-gray-600 text-xs sm:text-sm md:text-base">/month</span>}
          </div>
          {plan.price === 0 && (
            <span className="inline-block px-2 sm:px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs sm:text-sm font-medium">
              Forever Free
            </span>
          )}
        </div>

        {/* Plan Limits */}
        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
            <div>
              <div className="text-xl sm:text-2xl font-bold text-primary-600">{plan.propertyLimit}</div>
              <div className="text-xs sm:text-sm text-gray-600">Properties</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-primary-600">{plan.imagePerPropertyLimit}</div>
              <div className="text-xs sm:text-sm text-gray-600">Images/Property</div>
            </div>
          </div>
        </div>

        {/* Features List */}
        <div className="mb-6 sm:mb-8">
          <h4 className="font-semibold text-gray-800 mb-2 sm:mb-3 text-sm sm:text-base">What's included:</h4>
          <ul className="space-y-2">
            {plan.features.split(",").map((feature, index) => (
              <li key={index} className="flex items-start gap-2 sm:gap-3">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">{feature.trim()}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Purchase Button */}
      <div className="mt-auto">
        <PurchasePlan plan={plan} />
      </div>
    </Card>
  )
}

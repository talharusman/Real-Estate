import PageTitle from "@/app/components/pageTitle"
import { getUserById } from "@/lib/actions/user"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import type { ReactNode } from "react"
import SectionTitle from "./_components/sectionTitle"
import { Avatar, Button, Card } from "@nextui-org/react"
import UploadAvatar from "./_components/UploadAvatar"
import Link from "next/link"
import prisma from "@/lib/prisma"

const ProfilePage = async () => {
  const { getUser } = await getKindeServerSession()
  const user = await getUser()
  const dbUser = await getUserById(user ? user.id : "")

  const userSubcription = await prisma.subscriptions.findFirst({
    where: { userId: dbUser?.id },
    include: { plan: true },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <PageTitle title="My Profile" linkCaption="← Back To Home" href="/" />

      <div className="p-2 sm:p-3 md:p-4 lg:p-6 max-w-6xl mx-auto space-y-4 sm:space-y-6">
        {/* Basic Information Card */}
        <Card className="p-3 sm:p-4 md:p-6">
          <SectionTitle title="Basic Information" />

          <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
            {/* Avatar Section */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
              <div className="flex flex-col items-center">
                <Avatar
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
                  src={dbUser?.avatarUrl ?? "/profile.png"}
                />
                <div className="mt-2">
                  <UploadAvatar userId={dbUser?.id!} />
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center sm:text-left sm:ml-4 md:ml-6">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                  {`${dbUser?.firstName} ${dbUser?.lastName}`}
                </h2>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">{dbUser?.email}</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-2">
                  Member since {dbUser?.createdAt.toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8">
              <Attribute title="Full Name" value={`${dbUser?.firstName} ${dbUser?.lastName}`} />
              <Attribute title="Email Address" value={dbUser?.email} />
              <Attribute title="Member Since" value={dbUser?.createdAt.toLocaleDateString()} />
              <Attribute title="Properties Listed" value="1" />
            </div>
          </div>
        </Card>

        {/* Subscription Details Card */}
        <Card className="p-3 sm:p-4 md:p-6">
          <SectionTitle title="Subscription Details" />

          <div className="mt-4 sm:mt-6">
            {userSubcription ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  <Attribute
                    title="Current Plan"
                    value={
                      <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-primary-100 text-primary-800">
                        {userSubcription.plan.name}
                      </span>
                    }
                  />
                  <Attribute
                    title="Monthly Price"
                    value={
                      <span className="font-semibold text-green-600 text-sm sm:text-base">
                        ${userSubcription.plan.price}/month
                      </span>
                    }
                  />
                  <Attribute title="Purchased On" value={userSubcription.createdAt.toLocaleDateString()} />
                </div>

                <div className="mt-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2 text-sm sm:text-base">Plan Features:</h4>
                  <div className="text-xs sm:text-sm text-gray-600">
                    {userSubcription.plan.features.split(",").map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 mb-1">
                        <div className="w-1.5 h-1.5 bg-primary-500 rounded-full flex-shrink-0"></div>
                        <span>{feature.trim()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 sm:py-8">
                <div className="mb-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <svg
                      className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-2">No Active Subscription</h3>
                  <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base px-2">
                    Upgrade to a premium plan to unlock more features and list more properties.
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-center mt-4 sm:mt-6">
              <Button as={Link} href="/user/subscription" color="secondary" size="md" className="w-full sm:w-auto">
                {userSubcription ? "Upgrade Subscription" : "Choose Your Plan"}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default ProfilePage

const Attribute = ({ title, value }: { title: string; value: ReactNode }) => (
  <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
    <div className="text-xs sm:text-sm font-medium text-gray-500 mb-1">{title}</div>
    <div className="text-sm sm:text-base font-semibold text-gray-900">{value}</div>
  </div>
)

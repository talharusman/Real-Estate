import SubmitButton from "@/app/components/SubmitButton"
import { deleteProperty } from "@/lib/actions/property"
import prisma from "@/lib/prisma"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { Button, Card } from "@nextui-org/react"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import PageTitle from "@/app/components/pageTitle"

interface Props {
  params: { id: string }
}

async function DeletePropertyPage({ params }: Props) {
  const { getUser } = getKindeServerSession()
  const propertyPromise = prisma.property.findUnique({
    where: {
      id: +params.id,
    },
  })
  const [property, user] = await Promise.all([propertyPromise, getUser()])

  if (!property) return notFound()
  if (!user || property.userId !== user.id) redirect("/unauthorized")

  const deleteAction = async () => {
    "use server"
    try {
      await deleteProperty(+params.id)
      redirect("/user/properties")
    } catch (e) {
      throw e
    }
  }

  return (
    <div>
      <PageTitle title="Delete Property" href="/" linkCaption="← Back to Home" />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-2 sm:p-4">
        <Card className="w-full max-w-sm sm:max-w-md p-4 sm:p-6">
          <form action={deleteAction} className="flex flex-col items-center justify-center gap-3 sm:gap-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 text-center">Delete Property</h2>
            <p className="text-center text-gray-600 text-sm sm:text-base px-2">
              Are you sure you want to delete this property?
            </p>
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg w-full">
              <p className="text-center text-sm sm:text-base">
                <span className="text-slate-400">Name: </span>
                <span className="text-slate-700 font-medium break-words">{property.name}</span>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 w-full">
              <Link href={"/user/properties"} className="flex-1">
                <Button className="w-full" variant="bordered" size="sm">
                  Cancel
                </Button>
              </Link>
              <SubmitButton type="submit" color="danger" variant="light" className="flex-1" size="sm">
                Delete
              </SubmitButton>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default DeletePropertyPage

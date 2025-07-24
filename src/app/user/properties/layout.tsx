import type { ReactNode } from "react"
import PageTitle from "@/app/components/pageTitle"

interface Props {
  children: ReactNode
  modalDelete: ReactNode
}
const PropertiesLayout = ({ children, modalDelete }: Props) => {
  return (
    <div>
      <PageTitle title="My Properties" href="/" linkCaption="← Back to Home" />
      {children}
      <div>{modalDelete}</div>
    </div>
  )
}

export default PropertiesLayout

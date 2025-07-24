import type { ReactNode } from "react"

interface Props {
  children: ReactNode
}

const UserLayout = ({ children }: Props) => {
  return <div>{children}</div>
}

export default UserLayout

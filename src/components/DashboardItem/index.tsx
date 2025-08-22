import type { IconType } from "react-icons"

type DashboardItemProps = {
  icon: IconType,
  title: string,
  moneySign?: string,
  value: string,
}

export default function DashboardItem(props: DashboardItemProps) {
  return (
    <div className="border p-8 shadow rounded-md">
      <div className="flex items-center gap-1">
        <props.icon className="text-xl text-blue-500" />
        <p className="text-lg">{props.title}</p>
      </div>

      <div className="flex gap-2 items-center mt-3">
        <p>{props.moneySign}</p>
        <p className="text-4xl">{props.value}</p>
      </div>
    </div>
  )
}
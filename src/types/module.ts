import { Icon, IconProps } from "@tabler/icons-react"

type ModuleType = "REPO" | "ANNEX" | "EMAIL" | "TIME"

export type Module = {
  idmodulo: number
  nodeid: string
  modulonome: string
  moduloicon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<Icon>
  >
  modulotipo: ModuleType
  moduloestagio: number
}

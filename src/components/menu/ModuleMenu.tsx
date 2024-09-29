import { Menu, rem } from "@mantine/core"
import {
  Icon3dCubeSphere,
  IconArrowLeftCircle,
  IconArrowRightCircle,
  IconCube3dSphere,
  IconSettings,
  IconTrash,
} from "@tabler/icons-react"
import React from "react"
import { Module } from "../../types/module"
import { useReactFlow } from "@xyflow/react"
import { faker } from "@faker-js/faker"

interface ModuleMenuProps {
  createModule: (module: Omit<Module, "idmodulo" | "nodeid">) => Module
  module: Module
  children: React.ReactNode
}

function ModuleMenu({ module, createModule, children }: ModuleMenuProps) {
  const { setEdges } = useReactFlow()

  const createModuleNextStage = () => {
    const newModule = createModule({
      moduloestagio: module.moduloestagio + 1,
      moduloicon: IconCube3dSphere,
      modulonome: faker.database.column(),
      modulotipo: "ANNEX",
    })

    setEdges((prev) => [
      ...prev,
      {
        id: `${module.nodeid}-${newModule.nodeid}`,
        source: module.nodeid,
        target: newModule.nodeid,
        type:"custom-edge",
        animated:true
      },
    ])
  }

  return (
    <Menu
      shadow="md"
      position="right"
      withArrow
      key="module-menu"
      id="module-menu"
    >
      <Menu.Target>{children}</Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          leftSection={
            <IconArrowRightCircle style={{ width: rem(20), height: rem(20) }} />
          }
          onClick={createModuleNextStage}
        >
          Create module in next stage
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconArrowLeftCircle style={{ width: rem(20), height: rem(20) }} />
          }
        >
          Create module in previous stage
        </Menu.Item>

        <Menu.Item
          leftSection={
            <Icon3dCubeSphere style={{ width: rem(20), height: rem(20) }} />
          }
        >
          Change module type
        </Menu.Item>

        <Menu.Item
          leftSection={
            <IconSettings style={{ width: rem(20), height: rem(20) }} />
          }
        >
          Properties
        </Menu.Item>
        <Menu.Divider />

        <Menu.Item
          color="red"
          leftSection={
            <IconTrash style={{ width: rem(20), height: rem(20) }} />
          }
        >
          Delete module
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default ModuleMenu
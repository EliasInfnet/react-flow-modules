import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Group,
  Paper,
  Stack,
  Text,
} from "@mantine/core"
import { Handle, NodeProps, Position } from "@xyflow/react"
import React, { useContext } from "react"
import { initialModules } from "../data/initial-modules"
import ModuleMenu from "./menu/ModuleMenu"
import { NODE_HEIGHT, NODE_WIDTH } from "../constants/node"
import ReactFlowContext from "../context/ReactFlowContext"
import { Module } from "../types/module"
import { faker } from "@faker-js/faker"

function ModuleNode(props: NodeProps) {
  const { createModule, deleteModule, modules } = useContext(ReactFlowContext)

  const module = modules.find((m) => m.nodeid === props.id) as Module

  const Icon = module?.moduloicon || null

  const handleStyle = {
    height: NODE_HEIGHT / 5,
    width: NODE_WIDTH / 20,
    borderRadius: 2,
    background: "var(--mantine-color-gray-3)",
    border: "none",
  }

  return (
    <Paper
      shadow="sm"
      bg={"white"}
      style={{ borderRadius: 5 }}
      h={NODE_HEIGHT}
      w={NODE_WIDTH}
      p={5}
    >
      <Handle position={Position.Left} type="target" style={handleStyle} />
      <ModuleMenu
        module={module}
        createModule={createModule}
        deleteModule={deleteModule}
      >
        <Button
          w={"100%"}
          h={"100%"}
          p={0}
          color={"dark"}
          variant="white"
          autoContrast
        >
          <Stack
            gap={"xs"}
            w={"100%"}
            opacity={module?.modulotipo === "EMAIL" ? 0.5 : 1}
          >
            <Stack gap={5}>
              <Group justify="space-between">
                <Group justify="start" gap={"xs"} wrap="nowrap">
                  <Group>
                    {Icon ? <Icon size={20} strokeWidth={1.5} /> : null}
                  </Group>
                  <Text fw={"bold"} size="xs">
                    MODULO_ANNEX_...
                  </Text>
                </Group>
                <Text size="xs" c={"dimmed"}>
                  27/10 11:30
                </Text>
              </Group>
              <Divider />
              <Group>
                <Avatar.Group>
                  <Avatar
                    color={"initials"}
                    size={"sm"}
                    name={faker.person.firstName()}
                  />
                  <Avatar
                    color={"initials"}
                    size={"sm"}
                    name={faker.person.firstName()}
                  />
                  <Avatar
                    color={"initials"}
                    size={"sm"}
                    name={faker.person.firstName()}
                  />
                  <Avatar
                    color={"initials"}
                    size={"sm"}
                    name={faker.person.firstName()}
                  />
                  <Avatar
                    color={"initials"}
                    size={"sm"}
                    name={faker.person.firstName()}
                  />
                  <Avatar size={"sm"} color="blue">
                    +5
                  </Avatar>
                </Avatar.Group>
              </Group>
            </Stack>
            <Divider />
            <Stack gap={"xs"}>
              <Group justify="space-between">
                <Badge
                  radius={"xs"}
                  color={module?.modulotipo === "EMAIL" ? "cyan" : "red"}
                >
                  {module?.modulotipo === "EMAIL" ? "On time" : "Overdue"}
                </Badge>
                <Badge radius={"xs"} color={module?.modulotipo === "EMAIL" ? "green" : "blue"}>
                  {module?.modulotipo === "EMAIL" ? "Completed" : "On going"}
                </Badge>
              </Group>
            </Stack>
          </Stack>
        </Button>
      </ModuleMenu>
      <Handle position={Position.Right} type="source" style={handleStyle} />
    </Paper>
  )
}

export default ModuleNode

import {
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Button,
  Divider,
  Group,
  LoadingOverlay,
  Paper,
  Progress,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core"
import { Handle, NodeProps, Position } from "@xyflow/react"
import React, { useContext } from "react"
import { initialModules } from "../data/initial-modules"
import ModuleMenu from "./menu/ModuleMenu"
import { NODE_HEIGHT, NODE_WIDTH } from "../constants/node"
import ReactFlowContext from "../context/ReactFlowContext"
import { Module } from "../types/module"
import { faker } from "@faker-js/faker"
import { IconPaperclip } from "@tabler/icons-react"

const persons = Array(12)
  .fill(1)
  .map(() => faker.person.fullName())

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
    zIndex: 10,
  }

  return (
    <Box pos="relative" opacity={module?.modulotipo === "EMAIL" ? 1 : 0.6}>
      <LoadingOverlay
        visible={!module}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      {/* ...other content */}
      <ModuleMenu
        module={module}
        createModule={createModule}
        deleteModule={deleteModule}
      >
        <Paper
          shadow="sm"
          bg={"white"}
          style={{ borderRadius: 5 }}
          h={NODE_HEIGHT}
          w={NODE_WIDTH}
          p={"md"}
        >
          <Handle position={Position.Left} type="target" style={handleStyle} />

          <Button
            radius={0}
            style={{
              borderLeft: `var(--mantine-color-${
                module?.modulotipo === "EMAIL" ? "yellow" : "green"
              }-5) 6px solid`,
            }}
            w={"100%"}
            h={"100%"}
            variant="white"
            color="dark"
            justify="start"
          >
            <Stack h={"100%"} gap={"xs"}>
              <Stack gap={"xs"}>
                <Group justify="space-between">
                  <Group justify="start" gap={5}>
                    <ThemeIcon variant="transparent" color="dark">
                      {Icon && <Icon size={20} />}
                    </ThemeIcon>
                    <Text fz={"sm"} fw={"bold"}>
                      Modulo anexo 930
                    </Text>
                  </Group>
                  <Avatar color="initials" size={"sm"} name="Super user" />
                </Group>
                <Text
                  ta={"start"}
                  style={{ lineBreak: "anywhere", textWrap: "pretty" }}
                  c={"dimmed"}
                  size="xs"
                  w={"100%"}
                >
                  Descrição do módulo teste Descrição do módulo
                </Text>
              </Stack>
              <Group wrap="nowrap" justify="space-between">
                <AvatarGroup>
                  <Avatar
                    name={faker.person.fullName()}
                    color="initials"
                    size={"sm"}
                  />
                  <Avatar
                    name={faker.person.fullName()}
                    color="initials"
                    size={"sm"}
                  />
                  <Avatar
                    name={faker.person.fullName()}
                    color="initials"
                    size={"sm"}
                  />
                  <Avatar
                    name={faker.person.fullName()}
                    color="initials"
                    size={"sm"}
                  />
                  <Avatar
                    name={faker.person.fullName()}
                    color="initials"
                    size={"sm"}
                  />
                  <Avatar
                    name={faker.person.fullName()}
                    color="initials"
                    size={"sm"}
                  />
                  <Avatar name={"+5"} color="initials" size={"sm"} />
                </AvatarGroup>
                <Stack gap={0} w={"50%"}>
                  <Text size="xs" fw={"bold"}>
                    SLA
                  </Text>
                  <Progress
                    color={module?.modulotipo === "EMAIL" ? "yellow" : "green"}
                    value={module?.modulotipo === "EMAIL" ? 75 : 100}
                    animated={module?.modulotipo === "EMAIL"}
                  />
                </Stack>
              </Group>
            </Stack>
          </Button>
          <Handle position={Position.Right} type="source" style={handleStyle} />
        </Paper>
      </ModuleMenu>
    </Box>
  )
}

export default ModuleNode

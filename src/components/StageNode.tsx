import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Group,
  Indicator,
  Paper,
  Stack,
  Text,
} from "@mantine/core"
import {
  Icon123,
  IconArrowBigRightLine,
  IconArrowBigRightLines,
  IconArrowRightCircle,
  IconCrane,
  IconCube3dSphere,
  IconPencil,
  IconPlus,
  IconX,
} from "@tabler/icons-react"
import { Handle, Node, NodeProps, Position, useReactFlow } from "@xyflow/react"
import React, { useContext, useMemo } from "react"
import {
  NODE_GAP,
  NODE_HEIGHT,
  NODE_WIDTH,
  STAGE_WIDTH,
} from "../constants/node"
import ReactFlowContext, {
  ReactFlowContextType,
} from "../context/ReactFlowContext"
import { Module } from "../types/module"
import { faker } from "@faker-js/faker"

function StageNode(props: NodeProps) {
  const { createModule } = useContext<ReactFlowContextType>(ReactFlowContext)
  const { setNodes, screenToFlowPosition, fitView } = useReactFlow()

  const addModuleToStage = () => {
    createModule({
      moduloestagio: Number(props.data?.stage),
      moduloicon: IconCube3dSphere,
      modulonome: faker.person.lastName(),
      modulotipo: "EMAIL",
    })
  }

  const stageName = useMemo(() => faker.company.buzzNoun(), [])

  return (
    <Box style={{ borderRadius: 5, backgroundColor: "transparent" }} h={"100%"}>
      <Stack
        mt={-(NODE_GAP * 2) - 10}
        align="center"
        justify="space-between"
        h={"100%"}
      >
        <Group>
          <Paper shadow="sm">
            <Button
              leftSection={<IconPencil size={15} />}
              variant="white"
              color="dark"
              autoContrast
            >
              <Text size="xs" maw={150}>
                Estágio {stageName}
              </Text>
            </Button>
          </Paper>
          <Indicator
            color="white"
            label={<IconPlus color="black" size={8} strokeWidth={4} />}
            size={15}
          >
            <Paper shadow="sm">
              <ActionIcon size={"lg"} variant="white" color="dark">
                <IconArrowBigRightLine size={15} />
              </ActionIcon>
            </Paper>
          </Indicator>
        </Group>
        <ActionIcon
          mb={-NODE_GAP - 10}
          w={NODE_WIDTH}
          h={NODE_HEIGHT}
          variant="outline"
          bd={"1px dashed"}
          onClick={addModuleToStage}
        >
          <IconPlus />
        </ActionIcon>
      </Stack>
    </Box>
  )
}

export default StageNode

import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  Text,
} from "@mantine/core"
import {
  Icon123,
  IconCrane,
  IconCube3dSphere,
  IconPencil,
  IconPlus,
  IconX,
} from "@tabler/icons-react"
import { Handle, Node, NodeProps, Position, useReactFlow } from "@xyflow/react"
import React, { useContext, useMemo } from "react"
import { NODE_GAP, NODE_SIZE, STAGE_WIDTH } from "../constants/node"
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
    fitView({ padding: 1, duration: 500, includeHiddenNodes: true })
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
        <Paper shadow="sm">
          <Button
            leftSection={<IconPencil size={15} strokeWidth={1.5} />}
            variant="white"
            color="dark"
            autoContrast
          >
            <Text size="xs" maw={150}>
              Estágio {stageName}
            </Text>
          </Button>
        </Paper>
        <ActionIcon
          mb={-NODE_GAP - 10}
          size={NODE_SIZE}
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

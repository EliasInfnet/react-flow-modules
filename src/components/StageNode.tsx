import { ActionIcon, Box, Button, Divider, Stack, Text } from "@mantine/core"
import { Icon123, IconPlus, IconX } from "@tabler/icons-react"
import { Handle, Node, NodeProps, Position, useReactFlow } from "@xyflow/react"
import React, { useContext } from "react"
import { NODE_GAP, NODE_SIZE, STAGE_WIDTH } from "../constants/node"
import ReactFlowContext, {
  ReactFlowContextType,
} from "../context/ReactFlowContext"
import { Module } from "../types/module"
import { faker } from "@faker-js/faker"

function StageNode(props: NodeProps) {
  const { createModule } = useContext<ReactFlowContextType>(ReactFlowContext)
  const { setNodes, screenToFlowPosition } = useReactFlow()

  const addModuleToStage = () => {
    createModule({
      moduloestagio: Number(props.data?.stage),
      moduloicon: Icon123,
      modulonome: faker.person.lastName(),
      modulotipo: "ANNEX",
    })
  }

  return (
    <Box style={{ borderRadius: 5, backgroundColor: "transparent" }} h={"100%"}>
      <Stack
        mt={-(NODE_GAP * 2)}
        align="center"
        justify="space-between"
        h={"100%"}
      >
        <Stack gap={1}>
          <Text size="xs">Estágio Comercial</Text>
          <Divider w={"100%"} />
        </Stack>
        <ActionIcon
          mb={-NODE_GAP}
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

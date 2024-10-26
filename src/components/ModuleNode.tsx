import { Box, Button, Group, Paper, Stack, Text } from "@mantine/core"
import { Handle, NodeProps, Position } from "@xyflow/react"
import React, { useContext } from "react"
import { initialModules } from "../data/initial-modules"
import ModuleMenu from "./menu/ModuleMenu"
import { NODE_SIZE } from "../constants/node"
import ReactFlowContext from "../context/ReactFlowContext"
import { Module } from "../types/module"
function ModuleNode(props: NodeProps) {
  const { createModule, deleteModule, modules } = useContext(ReactFlowContext)

  const module = modules.find((m) => m.nodeid === props.id) as Module

  const Icon = module?.moduloicon || null

  const handleStyle = {
    height: NODE_SIZE / 3,
    width: NODE_SIZE / 9,
    borderRadius: 2,
    background: "var(--mantine-color-gray-3)",
    border: "none",
  }

  return (
    <Paper shadow="sm" bg={"gray.0"} style={{ borderRadius: 5 }} h={"100%"} p={5}>
      <Handle position={Position.Left} type="target" style={handleStyle} />
      <ModuleMenu
        module={module}
        createModule={createModule}
        deleteModule={deleteModule}
      >
        <Button px={"xs"} w={"100%"} h={"100%"} color={"dark"} variant="white" autoContrast>
          {Icon ? <Icon size={20} strokeWidth={1.5}/> : null}
          {/* <Text fz={6} style={{ lineBreak: "anywhere", textAlign: "start" }}>
            {module?.modulonome}
          </Text> */}
        </Button>
      </ModuleMenu>
      <Handle position={Position.Right} type="source" style={handleStyle} />
    </Paper>
  )
}

export default ModuleNode

import { useCallback, useEffect, useState } from "react"
import {
  Avatar,
  Button,
  Divider,
  Group,
  Paper,
  Stack,
  Text,
} from "@mantine/core"
import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Edge,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react"
import { Icon123, IconCube3dSphere, IconPaperclip } from "@tabler/icons-react"
import { initialEdges } from "./data/initial-edges"
import CustomEdge from "./components/CustomEdge"
import StageNode from "./components/StageNode"
import ModuleNode from "./components/ModuleNode"
import { createReactFlowFromModules } from "./utils/node-functions"
import { Module } from "./types/module"
import { ReactFlowProvider } from "./context/ReactFlowContext"

const nodeTypes = {
  "module-node": ModuleNode,
  "stage-node": StageNode,
}

const edgeTypes = {
  "custom-edge": CustomEdge,
}

function App() {
  const [modules, setModules] = useState<Module[]>([])
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  useEffect(() => {
    setNodes(() => createReactFlowFromModules(modules))
  }, [modules])

  const onConnect = useCallback((connection: Connection) => {
    const edge: Edge = {
      ...connection,
      animated: true,
      id: `${connection.source}-${connection.target}`,
      type: "custom-edge",
      style: { stroke: "var(--mantine-color-green-6)", strokeWidth: 2 },
    }
    setEdges((prevEdges) => addEdge(edge, prevEdges))
  }, [])

  return (
    <Stack h={"100vh"}>
      <Paper h={"70%"} w={"100vw"}>
        <ReactFlowProvider modules={modules} setModules={setModules}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            draggable={false}
            fitView
            fitViewOptions={{
              duration: 500,
              padding: 1,
              includeHiddenNodes: true,
            }}
            zoomOnDoubleClick={false}
          >
            <Background
              variant={BackgroundVariant.Dots}
              bgColor="var(--mantine-color-gray-0)"
            />
          </ReactFlow>
        </ReactFlowProvider>
      </Paper>
      <Group gap={"lg"}>
        <Button
          onClick={() =>
            setModules((prev) => [
              ...prev,
              {
                idmodulo: Date.now(),
                moduloestagio: Math.floor(Math.random() * 5),
                moduloicon: Icon123,
                modulonome: "Módulo teste",
                modulotipo: "ANNEX",
                nodeid: String(Date.now()),
              },
            ])
          }
        >
          Create
        </Button>
      </Group>
    </Stack>
  )
}

export default App

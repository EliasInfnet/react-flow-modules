import { useCallback, useEffect, useState } from "react"
import { Button, Group, Paper, Stack, Text } from "@mantine/core"
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
import { initialEdges } from "./data/initial-edges"
import CustomEdge from "./components/CustomEdge"
import StageNode from "./components/StageNode"
import { initialModules } from "./data/initial-modules"
import ModuleNode from "./components/ModuleNode"
import { createReactFlowFromModules } from "./utils/node-functions"
import { Module } from "./types/module"
import { Icon123 } from "@tabler/icons-react"
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
    }
    setEdges((prevEdges) => addEdge(edge, prevEdges))
  }, [])

  return (
    <Group h={"100vh"} gap={0}>
      <Paper h={"100%"} w={"80vw"}>
        <ReactFlowProvider
          modules={modules}
          setModules={setModules}
        >
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
          >
            <Background variant={BackgroundVariant.Dots} />
          </ReactFlow>
        </ReactFlowProvider>
      </Paper>
      <Paper h={"100%"}>
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
      </Paper>
    </Group>
  )
}

export default App

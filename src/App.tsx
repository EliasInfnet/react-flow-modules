import { useCallback, useEffect, useState } from "react"
import {
  ActionIcon,
  Avatar,
  AvatarGroup,
  Button,
  ButtonGroup,
  Divider,
  Group,
  Paper,
  Progress,
  Stack,
  Text,
  ThemeIcon,
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
import {
  Icon123,
  IconBinaryTree,
  IconCube3dSphere,
  IconDeviceFloppy,
  IconDownload,
  IconPaperclip,
  IconQuestionMark,
  IconUpload,
} from "@tabler/icons-react"
import { initialEdges } from "./data/initial-edges"
import CustomEdge from "./components/CustomEdge"
import StageNode from "./components/StageNode"
import ModuleNode from "./components/ModuleNode"
import { createReactFlowFromModules } from "./utils/node-functions"
import { Module } from "./types/module"
import { ReactFlowProvider } from "./context/ReactFlowContext"
import { NODE_HEIGHT, NODE_WIDTH } from "./constants/node"
import { faker } from "@faker-js/faker"

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
    <Stack h={"100vh"} gap={0}>
      <Group justify="end" w={"100%"}>
        <ButtonGroup>
          <Button
            leftSection={<IconUpload size={20} />}
            variant="outline"
            color="dark"
          >
            Exportar
          </Button>
          <Button
            leftSection={<IconDownload size={20} />}
            variant="outline"
            color="dark"
          >
            Importar
          </Button>
          <ActionIcon size={36} color="dark" variant="outline" radius={"xs"}>
            <IconDeviceFloppy size={20} />
          </ActionIcon>

          <ActionIcon size={36} color="dark" variant="outline" radius={"xs"}>
            <IconQuestionMark size={20} />
          </ActionIcon>
        </ButtonGroup>
      </Group>
      <Group w={"100%"} justify="space-between" align="end" gap={"sm"}>
        <Group gap={"sm"}>
          <IconBinaryTree size={15} />
          <Text>Projeto teste</Text>
        </Group>
        <Stack>
          <Text fz={"xs"} fw={"bold"} c={"dimmed"}>
            Fluxo do projeto
          </Text>
        </Stack>
      </Group>
      <Paper radius={"md"} h={"75%"} w={"100vw"} shadow="sm">
        <ReactFlowProvider modules={modules} setModules={setModules}>
          <ReactFlow
            style={{ borderRadius: 12 }}
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
        <Paper shadow="sm" w={NODE_WIDTH} h={NODE_HEIGHT} p={"xs"}>
          <Button
            radius={0}
            style={{
              borderLeft: "var(--mantine-color-green-5) 6px solid",
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
                      <IconPaperclip size={20} />
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
                  <Progress color={"blue"} value={75} animated />
                </Stack>
              </Group>
            </Stack>
          </Button>
        </Paper>
      </Group>
    </Stack>
  )
}

export default App

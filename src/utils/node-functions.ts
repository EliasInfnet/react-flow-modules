import { Node } from "@xyflow/react"
import {
  NODE_GAP,
  NODE_SIZE,
  STAGE_GAP,
  STAGE_PADDING_Y,
  STAGE_WIDTH,
} from "../constants/node"
import { Module } from "../types/module"

export const createStage = (stageNumber: number, numberOfModules: number) => {
  const newStage: Node = {
    id: `stage-${stageNumber}`,
    width: STAGE_WIDTH,
    height:
      STAGE_PADDING_Y * 2 + (numberOfModules + 1) * (NODE_SIZE + NODE_GAP),
    position: {
      y: 0,
      x: stageNumber * (STAGE_WIDTH + STAGE_GAP),
    },
    data: {
      stage: stageNumber,
    },
    type: "stage-node",
    draggable: false,
  }
  return newStage
}

const createNode = (stageNumber: number, index: number, id: string) => {
  const newNode: Node = {
    id,
    data: {},
    width: NODE_SIZE,
    height: NODE_SIZE,
    position: {
      x: STAGE_WIDTH / 2 - NODE_SIZE / 2,
      y: STAGE_PADDING_Y + index * (NODE_GAP + NODE_SIZE),
    },
    extent: "parent",
    parentId: `stage-${stageNumber}`,
    type: "module-node",
    draggable: false,
  }
  return newNode
}

export const createReactFlowFromModules = (modules: Module[]): Node[] => {
  const stagesNumbers: number[] = modules.reduce((acc, item) => {
    return [...new Set([...acc, item.moduloestagio])]
  }, [])

  const stageNodes = stagesNumbers.map((stage) => {
    const numberOfModulesOnStage = modules.filter(
      (m) => m.moduloestagio === stage
    ).length
    return createStage(stage, numberOfModulesOnStage)
  })

  const moduleNodes = stageNodes
    .map((s) => {
      const modulesFromStage = modules
        .filter((m) => `stage-${m.moduloestagio}` === s.id)
        .sort((a, b) => a.nodeid.localeCompare(b.nodeid))
        .map((m, index) => ({ ...m, index }))

      return modulesFromStage
    })
    .flat(2)
    .map((m) => createNode(m.moduloestagio, m.index, m.nodeid))

  return [...stageNodes, ...moduleNodes]
}

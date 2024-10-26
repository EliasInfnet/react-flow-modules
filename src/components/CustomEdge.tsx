import { ActionIcon, Box } from "@mantine/core"
import { IconX } from "@tabler/icons-react"
import {
  BezierEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierEdgeCenter,
  getBezierPath,
  useReactFlow,
} from "@xyflow/react"
import React, { useContext } from "react"
import ReactFlowContext from "../context/ReactFlowContext"

function CustomEdge(props: EdgeProps) {
  const { setEdges } = useReactFlow()

  const { modules } = useContext(ReactFlowContext)

  const {
    id,
    source,
    target,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  } = props

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  })

  return (
    <>
      <BezierEdge {...props}/>
      <EdgeLabelRenderer>
        <Box
          style={{
            pointerEvents: "all",
          }}
        >
          <ActionIcon
            size={"md"}
            color="red.9"
            variant="subtle"
            style={{
              position: "absolute",
              transform: `translate(-50%,-50%) translate(${labelX}px, ${labelY}px)`,
            }}
            onClick={() => {
              setEdges((prev) => prev.filter((e) => e.id !== id))
            }}
          >
            <IconX />
          </ActionIcon>
        </Box>
      </EdgeLabelRenderer>
    </>
  )
}

export default CustomEdge

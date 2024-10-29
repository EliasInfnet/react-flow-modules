import { createContext, useState } from "react"
import { Module } from "../types/module"
import { v4 } from "uuid"
import { Edge } from "@xyflow/react"

interface ReactFlowProviderProps {
  modules: Module[]
  setModules: React.Dispatch<React.SetStateAction<Module[]>>
  children: React.ReactNode
}

export type ReactFlowContextType = {
  createModule: (module: Omit<Module, "idmodulo" | "nodeid">) => Module
  deleteModule: (nodeId: string) => void
  modules: Module[]
}

const ReactFlowContext = createContext<ReactFlowContextType | null>(null)

export function ReactFlowProvider({
  modules,
  setModules,
  children,
}: ReactFlowProviderProps) {
  const createModule = (
    module: Omit<Module, "idmodulo" | "nodeid">
  ): Module => {
    const newModule: Module = {
      idmodulo: Math.ceil(Math.random() * 200),
      nodeid: String(Date.now()),
      ...module,
    }

    setModules((prev) => {
      return [...prev, newModule]
    })

    return newModule
  }

  const deleteModule = (nodeId: string): void => {
    setModules((prev) => prev.filter((m) => m.nodeid !== nodeId))
  }

  return (
    <ReactFlowContext.Provider value={{ createModule, deleteModule, modules }}>
      {children}
    </ReactFlowContext.Provider>
  )
}

export default ReactFlowContext

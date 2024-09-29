import { Module } from "../types/module"
import { IconClock, IconCloudUp, IconMail, IconPaperclip } from "@tabler/icons-react"

export const initialModules: Module[] = [
  {
    idmodulo: 1,
    moduloicon: IconPaperclip,
    modulonome: "Módulo de anexo",
    nodeid: "1726796863046",
    modulotipo: "ANNEX",
    moduloestagio: 0,
  },
  {
    idmodulo: 2,
    moduloicon: IconMail,
    modulonome: "Módulo de email",
    nodeid: "1726796870901",
    modulotipo: "EMAIL",
    moduloestagio: 1,
  },
  {
    idmodulo: 3,
    moduloicon: IconCloudUp,
    modulonome: "Módulo de repositório",
    nodeid: "1726796878429",
    modulotipo: "REPO",
    moduloestagio: 2,
  },
  
  {
    idmodulo: 4,
    moduloicon: IconClock,
    modulonome: "Módulo de tempo",
    nodeid: "1726951257695",
    modulotipo: "TIME",
    moduloestagio: 2,
  },
  {
    idmodulo: 5,
    moduloicon: IconMail,
    modulonome: "Módulo de email",
    nodeid: "1726952388000",
    modulotipo: "EMAIL",
    moduloestagio: 3,
  },
  {
    idmodulo: 6,
    moduloicon: IconCloudUp,
    modulonome: "Módulo de repositório",
    nodeid: "1726952398000",
    modulotipo: "REPO",
    moduloestagio: 4,
  },
  
  {
    idmodulo: 7,
    moduloicon: IconClock,
    modulonome: "Módulo de tempo",
    nodeid: "1726952404000",
    modulotipo: "TIME",
    moduloestagio: 1,
  },
]

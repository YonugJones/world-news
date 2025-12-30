/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WORLD_NEWS_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REWARDS_API_BASE_URL?: string;
  readonly VITE_REWARDS_PLAYER_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

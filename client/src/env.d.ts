/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  VITE_NESTJS_SERVER_URL: string;
  VITE_CHAT_API_URL: string;
  VITE_AUTH_API_URL: string;
}

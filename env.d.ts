// src/env.d.ts
declare global {
    namespace NodeJS {
      interface ProcessEnv {
        REACT_APP_GOOGLE_API_KEY: string;
      }
    }
  }
  
  export {};
  
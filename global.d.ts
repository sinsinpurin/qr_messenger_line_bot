declare namespace NodeJS {
    interface ProcessEnv {
      readonly CHANNEL_SECRET: string;
      readonly CHANNEL_TOKEN: string;
    }
  }
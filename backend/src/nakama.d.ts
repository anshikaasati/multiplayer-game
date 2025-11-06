// backend/src/nakama.d.ts

declare namespace nkruntime {
  type Context = any;
  type Logger = {
    info(msg: string): void;
    error(msg: string): void;
    warn(msg: string): void;
    debug(msg: string): void;
  };
  type Nakama = any;
  type MatchInit = { state: any; tickRate: number; label: string };
  type Presence = { userId: string; sessionId: string; username: string };
  type MatchDispatcher = any;
  type MatchMessage = { sender: Presence; data: string };
  type InitModule = (
    ctx: Context,
    logger: Logger,
    nk: Nakama,
    initializer: any
  ) => void;
}

declare var InitModule: nkruntime.InitModule;

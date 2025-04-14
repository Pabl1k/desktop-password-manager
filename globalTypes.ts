export interface ElectronApi {
  openExternal: (url: string) => Promise<void>;
}

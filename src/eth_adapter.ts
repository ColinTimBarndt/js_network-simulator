export default class EthAdapter {
  public constructor(
    private to: EthAdapter | null = null
  ) {
    
  }

  public get connected(): boolean {
    return this.to !== null;
  }
}
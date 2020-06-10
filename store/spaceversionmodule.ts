import {Module, Mutation, VuexModule} from "vuex-module-decorators";

@Module({
  name: "spaceversionmodule",
  stateFactory: true,
  namespaced: true
})
export default class SpaceVersionModule extends VuexModule {
  /** The space version */
  private _version: number = -1;

  @Mutation
  public updateVersion(version: number) {
    this._version = version;
  }

  get version(): number {
    return this._version;
  }

  get isVersionUpdated(): boolean {
    return this.version != -1;
  }
}

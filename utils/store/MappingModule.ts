import { Module, VuexModule, Mutation } from 'vuex-module-decorators';
import Framework from "~/plugins/api/components/Framework";
import Language from "~/plugins/api/components/Language";
import Technology from "~/plugins/api/components/Technology";
import Tag from "~/plugins/api/components/Tag";

/** Type that maps UUID strings to Stories */
type UUIDToStory<T> = {
  [P in string]: T;
}

@Module({
  name: "MappingModule",
  stateFactory: true,
  namespaced: true
})
export default abstract class MappingModule<T> extends VuexModule {
  /** Mapping from UUID to Story */
  public mapping: UUIDToStory<T> = {};

  /**
   * Clears the entire mapping
   */
  @Mutation
  public clear() {
    this.mapping = {};
  }

  /**
   * Inserts new mapping. If one exists, it will be overwritten.
   * @param uuid - the UUID key
   * @param story - the story value
   */
  @Mutation
  public insert({uuid, story}: {uuid: string, story: T}) {
    this.mapping[uuid] = story;
  }

  /**
   * Removes and returns a record.
   * @param uuid - the key of the record to be removed
   * @returns the matching Story record.
   */
  @Mutation
  public remove(uuid: string): T {
    const story: T = this.mapping[uuid];
    delete this.mapping[uuid];
    return story;
  }

  /**
   * Finds a Story given a UUID
   */
  public get find(): (uuid: string) => T {
    return (uuid: string): T => this.mapping[uuid];
  }

  /**
   * Returns how many mappings there are
   */
  public get size(): number {
    return Object.keys(this.mapping).length;
  }

  /**
   * Returns a list of stored UUIDs
   */
  public get uuids(): string[] {
    return Object.keys(this.mapping);
  }
}


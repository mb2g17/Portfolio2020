import Story from "~/plugins/api/components/Story";

/**
 * Tag wrapper class
 */
export default class Tag extends Story {
  public get name(): string {
    return this.story.name;
  }
}

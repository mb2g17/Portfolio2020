import Story from "~/plugins/api/components/Story";

/**
 * Framework wrapper class
 */
export default class Framework extends Story {
  public get name(): string {
    return this.story.name;
  }
}

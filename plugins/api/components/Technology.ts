import Story from "~/plugins/api/components/Story";

/**
 * Technology wrapper class
 */
export default class Technology extends Story {
  public get name(): string {
    return this.story.name;
  }
}

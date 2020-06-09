import Story from "~/plugins/api/components/Story";

/**
 * Language wrapper class
 */
export default class Language extends Story {
  public get name(): string {
    return this.story.name;
  }
}

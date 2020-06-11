import Story from "~/plugins/api/components/Story";

/**
 * Framework class
 */
export default class Framework extends Story {
  /** The name of this framework */
  public readonly name: string;

  public constructor(story: any) {
    super(story);
    this.name = story.name;
  }
}

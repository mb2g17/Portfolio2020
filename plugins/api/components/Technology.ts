import Story from "~/plugins/api/components/Story";

/**
 * Technology class
 */
export default class Technology extends Story {
  /** The name of this technology */
  public readonly name: string;

  public constructor(story: any) {
    super(story);
    this.name = story.name;
  }
}

import Story from "~/plugins/api/components/Story";

/**
 * Tag class
 */
export default class Tag extends Story {
  /** The name of this tag */
  public readonly name: string;

  public constructor(story: any) {
    super(story);
    this.name = story.name;
  }
}

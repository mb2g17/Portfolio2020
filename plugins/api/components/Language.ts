import Story from "~/plugins/api/components/Story";

/**
 * Language class
 */
export default class Language extends Story {
  /** The name of this language */
  public readonly name: string;

  public constructor(story: any) {
    super(story);
    this.name = story.name;
  }
}

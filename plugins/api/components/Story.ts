/**
 * Story abstract wrapper class
 */
export default abstract class Story {
  /** The raw JSON of this story */
  protected story: any;

  /**
   * Constructor of story
   * @param story
   */
  public constructor(story: any) {
    this.story = story;
  }

  public get uuid(): string {
    return this.story.uuid;
  }
}

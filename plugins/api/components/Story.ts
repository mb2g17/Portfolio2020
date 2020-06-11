/**
 * Story abstract class
 */
export default abstract class Story {
  /** Unique identifier of this story */
  public readonly uuid: string;

  /**
   * Constructor of story
   * @param story
   */
  protected constructor(story: any) {
    this.uuid = story.uuid;
  }
}

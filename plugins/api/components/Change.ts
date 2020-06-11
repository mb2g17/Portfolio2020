import Story from "~/plugins/api/components/Story";

/**
 * Changelog class
 */
export default class Change extends Story {
  /** Date at which this change happened */
  public readonly date: string;

  /** Logged changes, markdown format */
  public readonly changes: string;

  public constructor(story: any) {
    super(story);
    let bufferDate: Date = new Date(story.content.date);
    this.date = bufferDate.getFullYear() + "-" + (bufferDate.getMonth() + 1) + "-" + bufferDate.getDate();
    this.changes = story.content.changes;
  }
}

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
    const bufferDate: Date = new Date(story.content.date);

    const year = bufferDate.getFullYear();
    const month = this.padWithZeroes("" + (bufferDate.getMonth() + 1));
    const date = this.padWithZeroes("" + (bufferDate.getDate()));

    this.date = year + "-" + month + "-" + date;
    this.changes = story.content.changes;
  }

  public padWithZeroes(str: string): string {
    if (str.length == 1)
      return "0" + str;
    else
      return str;
  }
}

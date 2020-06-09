import Story from "~/plugins/api/components/Story";

/**
 * Changelog wrapper class
 */
export default class Change extends Story {
  public get date(): string {
    return this.story.content.date;
  }

  public get changes(): string {
    return this.story.content.changes;
  }
}

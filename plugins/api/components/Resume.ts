import Story from "~/plugins/api/components/Story";

/**
 * Resume class
 */
export default class Resume extends Story {
  /** URI link to resume file */
  public readonly link: string;

  public constructor(story: any) {
    super(story);
    this.link = story.content.resume.filename;
  }
}

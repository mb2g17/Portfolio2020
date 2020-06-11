import Story from "~/plugins/api/components/Story";

/**
 * Project wrapper class
 */
export default class Project extends Story {
  public readonly name: string;
  public readonly dateOfCompletion: string;
  public readonly tags: string[];
  public readonly starred: boolean;
  public readonly languages: string[];
  public readonly frameworks: string[];
  public readonly technologies: string[];
  public readonly banner: string;
  public readonly description: string;
  public readonly screenshots: string[];
  public readonly demo: string;
  public readonly release: string;
  public readonly source: string;

  public constructor(story: any) {
    super(story);
    this.name = story.name;
    this.dateOfCompletion = story.content.date_of_completion;
    this.tags = story.content.tags;
    this.starred = story.content.starred === "true";
    this.languages = story.content.languages;
    this.frameworks = story.content.frameworks;
    this.technologies = story.content.technologies;
    this.banner = story.content.banner.filename;
    this.description = story.content.description;
    this.screenshots = story.content.screenshots.map((x: any) => x.filename); // map to .filename
    this.demo = story.content.Demo.url;
    this.release = story.content.Release.url;
    this.source = story.content.Source.url;
  }
}

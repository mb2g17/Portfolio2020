import Story from "~/plugins/api/components/Story";

/**
 * Project wrapper class
 */
export default class Project extends Story {
  public get name(): string {
    return this.story.name;
  }

  public get dateOfCompletion(): string {
    return this.story.content.date_of_completion;
  }

  public get tags(): string[] {
    return this.story.content.tags;
  }

  public get starred(): boolean {
    return this.story.content.starred === "true";
  }

  public get languages(): string[] {
    return this.story.content.languages;
  }

  public get frameworks(): string[] {
    return this.story.content.frameworks;
  }

  public get technologies(): string[] {
    return this.story.content.technologies;
  }

  public get banner(): any {
    return this.story.content.banner;
  }

  public get description(): string {
    return this.story.content.description;
  }

  public get screenshots(): any[] {
    return this.story.content.screenshots;
  }

  public get demo(): string {
    return this.story.content.Demo.url;
  }

  public get release(): string {
    return this.story.content.Release.url;
  }

  public get source(): string {
    return this.story.content.Source.url;
  }
}

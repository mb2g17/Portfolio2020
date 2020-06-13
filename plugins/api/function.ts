import { NuxtAxiosInstance } from "@nuxtjs/axios";
import Story from "~/plugins/api/components/Story";
import Project from "~/plugins/api/components/Project";
import Change from "~/plugins/api/components/Change";
import Framework from "~/plugins/api/components/Framework";
import Language from "~/plugins/api/components/Language";
import Tag from "~/plugins/api/components/Tag";
import Technology from "~/plugins/api/components/Technology";
import { spaceVersionModule } from "~/utils/store/store-accessor";
import axios from "axios";

/**
 * Interface of the API plugin
 */
export interface ApiPluginInterface {
  /**
   * Gets multiple stories
   * @param options - extra query parameters
   * @param headers - if true, return value will be [array of stories, header response object]
   */
  getStories: (options?: any, headers?: boolean) => Promise<Story[] | [Story[], any] | undefined>;
}

export const getStories = async (options?: any, headers?: boolean) => {
  // Gets environment variables
  const api = process.env.API;
  const versionApi = process.env.VERSION_API;
  const token = process.env.TOKEN;

  // Guard: if we don't have our variables
  if (!api || !token || !versionApi) {
    throw Error("Environment variables not set up correctly.");
  }

  // If we haven't fetched a space version
  if (!spaceVersionModule.isVersionUpdated) {
    // Gets the newest space version
    const spaceVersionResponse = await axios.get(versionApi, {
      params: { token }
    });

    // Updates store with this version
    spaceVersionModule.updateVersion(spaceVersionResponse.data.space.version);
  }

  // Parses our request
  const response = await axios.get(api, {
    params: {
      ...options,
      token,
      version: "published",
      versions: spaceVersionModule.version
    },
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  });

  // Creates our story array
  const stories: Story[] = [];

  // Goes through all the stories
  for (const story of response.data.stories) {
    // Creates story based on component type
    switch (story.content.component)
    {
      case "project":
        stories.push(new Project(story));
        break;
      case "change":
        stories.push(new Change(story));
        break;
      case "framework":
        stories.push(new Framework(story));
        break;
      case "language":
        stories.push(new Language(story));
        break;
      case "tag":
        stories.push(new Tag(story));
        break;
      case "technology":
        stories.push(new Technology(story));
        break;
      default:
        throw Error(`Unrecognised component '${story.content.component}' on story '${story.full_slug}'.`);
    }
  }

  // If user wants headers, give them, if not, just return stories
  if (headers)
    return [stories, response.headers];
  else
    return stories;
};

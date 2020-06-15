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
import Resume from "~/plugins/api/components/Resume";

/**
 * Interface of the API plugin
 */
export interface ApiPluginInterface {
  /**
   * Gets resume object
   */
  getResume: () => Promise<Resume | undefined>;

  /**
   * Gets one story based on slug
   * @param fullSlug - the full slug of the story to get
   * @param options - extra query parameters
   * @param headers if true, return value will be [story, header response object]
   */
  getStory: (fullSlug: string, options?: any, headers?: boolean) => Promise<Story | [Story, any] | undefined>;

  /**
   * Gets multiple stories
   * @param options - extra query parameters
   * @param headers - if true, return value will be [array of stories, header response object]
   */
  getStories: (options?: any, headers?: boolean) => Promise<Story[] | [Story[], any] | undefined>;
}

// Environment variables
const api = process.env.API;
const versionApi = process.env.VERSION_API;
const token = process.env.TOKEN;

export const getResume: ApiPluginInterface["getResume"] = async () => {
  return await getStory("resume") as Resume;
}

export const getStory: ApiPluginInterface["getStory"] = async(fullSlug: string, options?: any, headers?: boolean) => {
  // Guard: if we don't have our variables
  if (!api || !token) {
    throw Error("Environment variables not set up correctly.");
  }

  // Updates space version, if it needs it
  await updateSpaceVersion();

  // Parses our request
  let response = await axios.get(`${api}/${fullSlug}`, {
    params: {
      ...options,
      token,
      version: "published",
      versions: spaceVersionModule.version
    },
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    validateStatus: () => true
  });

  if (response.status === 404)
    throw Error("Couldn't fetch project " + fullSlug);

  // Creates our story
  const story: Story = toStory(response.data.story);

  // If user wants headers, give them, if not, just return stories
  if (headers)
    return [story, response.headers];
  else
    return story;
}

export const getStories: ApiPluginInterface["getStories"] = async (options?: any, headers?: boolean) => {
  // Guard: if we don't have our variables
  if (!api || !token) {
    throw Error("Environment variables not set up correctly.");
  }

  // Updates space version, if it needs it
  await updateSpaceVersion();

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
  const stories: Story[] = response.data.stories.map((story: any) => toStory(story));

  // If user wants headers, give them, if not, just return stories
  if (headers)
    return [stories, response.headers];
  else
    return stories;
};

/**
 * Converts raw story JSON to story class instances
 * @param rawStory - the raw JSON story
 */
const toStory = (rawStory: any): Story => {
  // Creates story based on component type
  switch (rawStory.content.component)
  {
    case "project":
      return new Project(rawStory);
    case "change":
      return new Change(rawStory);
    case "framework":
      return new Framework(rawStory);
    case "language":
      return new Language(rawStory);
    case "tag":
      return new Tag(rawStory);
    case "technology":
      return new Technology(rawStory);
    case "resume":
      return new Resume(rawStory);
    default:
      throw Error(`Unrecognised component '${rawStory.content.component}' on story '${rawStory.full_slug}'.`);
  }
};

/**
 * Updates space version in space version store, if it needs it
 */
const updateSpaceVersion = async () => {
  // Guard: if we don't have our variables
  if (!token || !versionApi) {
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
}

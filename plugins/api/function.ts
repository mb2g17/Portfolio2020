import {NuxtAxiosInstance} from "@nuxtjs/axios";
import Story from "~/plugins/api/components/Story";
import Project from "~/plugins/api/components/Project";
import Change from "~/plugins/api/components/Change";
import Framework from "~/plugins/api/components/Framework";
import Language from "~/plugins/api/components/Language";
import Tag from "~/plugins/api/components/Tag";
import Technology from "~/plugins/api/components/Technology";

/**
 * API plugin function type
 */
export type ApiFunctionType = (axios: NuxtAxiosInstance, options?: any) => Promise<Story[] | undefined>;

/**
 * Function of API plugin
 */
export const ApiFunction: ApiFunctionType = async (axios: NuxtAxiosInstance, options?: any) => {
  // Gets environment variables
  const api = process.env.API;
  const token = process.env.TOKEN;

  // Guard: if we don't have our variables
  if (!api || !token) {
    throw Error("Environment variables not set up correctly.");
  }

  // Parses our request
  const response = await axios.get(api, {
    params: {
      ...options,
      token, version: "published"
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

  // Returns our story array
  return stories;
};

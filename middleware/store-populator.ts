import { Middleware, Context } from "@nuxt/types";
import { getStories } from "~/plugins/api/function";
import Story from "~/plugins/api/components/Story";

const storePopulator: Middleware = async (context: Context) => {
  // If we're on the client, stop
  if (!process.server)
    return;

  // List of stories and their respective stores
  const storyTypes: [string, /*MappingModule<any>*/any][] = [
    ["frameworks", "frameworkmodule/insert"],
    ["languages", "languagemodule/insert"],
    ["tags", "tagmodule/insert"],
    ["technologies", "technologymodule/insert"]
  ];

  // Goes through every story
  for (const storyType of storyTypes) {
    // Gets story name and stores
    const [storyName, store] = storyType;

    // Gets all the stories and store
    const stories: Story[] = await getStories({
      "starts_with": storyName
    }) as Story[];

    // Puts those stories in the store
    for (const story of stories) {
      // We have to use context and not store object because built version is picky
      context.store.commit(store, {
        uuid: story.uuid,
        story: JSON.parse(JSON.stringify(story)) // Hate to do this but server can't serialise object to client
      });
    }
  }

  // Success
  console.log("Inserted stories into store");
};

export default storePopulator;

import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';

import LanguageModule from "~/store/languagemodule";
import TechnologyModule from "~/store/technologymodule";
import FrameworkModule from "~/store/frameworkmodule";
import TagModule from "~/store/tagmodule";

// Creates stores
let frameworkStore: FrameworkModule;
let languageStore: LanguageModule;
let tagStore: TagModule;
let technologyStore: TechnologyModule;

// Initialises stores
function initialiseStores(store: Store<any>): void {
  frameworkStore = getModule(FrameworkModule, store);
  languageStore = getModule(LanguageModule, store);
  tagStore = getModule(TagModule, store);
  technologyStore = getModule(TechnologyModule, store);
}

// Exports stores
export { initialiseStores, frameworkStore, languageStore, tagStore, technologyStore };

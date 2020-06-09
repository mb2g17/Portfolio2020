import Language from "~/plugins/api/components/Language";
import MappingModule from "~/utils/store/MappingModule";
import {Module} from "vuex-module-decorators";

@Module({
  name: "languagemodule",
  stateFactory: true,
  namespaced: true
})
export default class LanguageModule extends MappingModule<Language> {}

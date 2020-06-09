import Tag from "~/plugins/api/components/Tag";
import MappingModule from "~/utils/store/MappingModule";
import {Module} from "vuex-module-decorators";

@Module({
  name: "tagmodule",
  stateFactory: true,
  namespaced: true
})
export default class TagModule extends MappingModule<Tag> {}

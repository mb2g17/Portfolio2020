import Technology from "~/plugins/api/components/Technology";
import MappingModule from "~/utils/store/MappingModule";
import {Module} from "vuex-module-decorators";

@Module({
  name: "technologymodule",
  stateFactory: true,
  namespaced: true
})
export default class TechnologyModule extends MappingModule<Technology> {}

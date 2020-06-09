import Framework from "~/plugins/api/components/Framework";
import MappingModule from "~/utils/store/MappingModule";
import {Module} from "vuex-module-decorators";

@Module({
  name: "frameworkmodule",
  stateFactory: true,
  namespaced: true
})
export default class FrameworkModule extends MappingModule<Framework> {
}

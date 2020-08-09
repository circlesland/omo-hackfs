import {ProcessBuilder} from "../../../core/Flows/ProcessBuilder";
import {IProcessContext} from "../../../core/Flows/IProcessContext";

export function requestUbi()
{
  return new ProcessBuilder<IProcessContext>("flows:omo.circles.requestUbi")
    .category("Add new chat room", (build) =>
      build

        .step("flows:omo.circles.requestUbi:requestUbi")
        .withSideEffect("omo.circles.requestUbi")
        .withTitle("Requesting your UBI ...")
    )
    .end()
    .build();
}

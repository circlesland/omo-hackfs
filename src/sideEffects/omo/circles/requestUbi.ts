/*import {ISideEffect} from "../../../core/Flows/ISideEffect";
import {IProcessContext} from "../../../core/Flows/IProcessContext";
import {Logger} from "../../../core/Log/logger";

export const requestUbi: ISideEffect<IProcessContext, any> = {
  _$schemaId: "sideEffects:omo.circles.requestUbi",
  inputs: [{
    name: "safeOwner",
    type: "schema:omo.safe.safeOwner"
  }, {
    name: "safe",
    type: "schema:omo.safe.safe"
  }],
  outputs: [{
    name: "void",
    type: "schema:omo.void"
  }],
  execute: async (context, argument) =>
  {
    // Check the localStorage if the UBI was requested less than 24 hours ago
    // if not, request it now.
    const lastRequestDateString = localStorage.getItem("LastUBIRequested");
    let requestNew = false;

    if (lastRequestDateString)
    {
      const lastRequestDate = new Date(parseInt(lastRequestDateString));
      requestNew = lastRequestDate.getTime() + (24 * 60 * 60 * 1000) < new Date().getTime();
    }

    if (requestNew)
    {
      Logger.log(context.local.processNodeId + ":sideEffects:omo.circles.requestUbi", "Sending request for UBI..");

      const payout = await window.o.circlesCore.token.requestUBIPayout(
        context.local.inputs["safeOwner"],
        context.local.inputs["safe"]);
    }
    else
    {
      Logger.log(context.local.processNodeId + ":sideEffects:omo.circles.requestUbi", "Less than 24h passed by since the last UBI request..");
    }
    context.local.outputs["void"] = {};
  },
  canExecute: async context => true
};


 */
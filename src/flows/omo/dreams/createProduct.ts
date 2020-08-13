import { ProcessBuilder } from "../../../core/Flows/ProcessBuilder";
import { IProcessContext } from "../../../core/Flows/IProcessContext";

export function createProduct() {
  return new ProcessBuilder<IProcessContext>("flows:omo.dreams.createProduct")
    .category("Create product", (build) =>
      build
        .step("flows:omo.dreams.createProduct:getName")
        .withSideEffect("sideEffects:omo.shell.collectStepResult")
        .mapOutput("stepResult", "name")
        .withQuant("OmoInput")
        .withPrompt("Name")
        .withTitle("Give your dream a name")

        .step("flows:omo.dreams.createProduct:getDescription")
        .withSideEffect("sideEffects:omo.shell.collectStepResult")
        .mapOutput("stepResult", "description")
        .withQuant("OmoInput")
        .withPrompt("Description")
        .withTitle("Describe what you want to do (200 characters)")

        .step("flows:omo.dreams.createProduct:getCategory")
        .withSideEffect("sideEffects:omo.shell.collectStepResult")
        .mapOutput("stepResult", "category")
        .withQuant("OmoInput")
        .withPrompt("Category?")
        .withTitle("Category?")

        .step("flows:omo.dreams.createProduct:getCity")
        .withSideEffect("sideEffects:omo.shell.collectStepResult")
        .mapOutput("stepResult", "city")
        .withQuant("OmoInput")
        .withPrompt("City?")
        .withTitle("City?")

        .step("flows:omo.dreams.createProduct:getPrice")
        .withSideEffect("sideEffects:omo.shell.collectStepResult")
        .mapOutput("stepResult", "price")
        .withQuant("OmoInput")
        .withPrompt("Price?")
        .withTitle("Price?")

        .step("flows:omo.dreams.createProduct:getPicture")
        .withSideEffect("sideEffects:omo.shell.collectStepResult")
        .mapOutput("stepResult", "pictureHash")
        .withQuant("OmoInput")
        .withPrompt("Picture hash?")
        .withTitle("Picture hash?")

        .step("flows:omo.dreams.createProduct:createProduct")
        .withSideEffect("sideEffects:omo.dreams.createProduct")
        .mapInput("name", "name")
        .mapInput("description", "description")
        .mapInput("category", "category")
        .mapInput("city", "city")
        .mapInput("price", "price")
        .mapInput("pictureHash", "pictureHash")
        .withTitle("Creating product ..")
    )
    .end()
    .build();
}

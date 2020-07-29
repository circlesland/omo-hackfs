import {ProcessNode, State} from "../../ProcessNode"

export class Trust extends ProcessNode
{
    title = "Trust someone";

    constructor()
    {
        super(null);

        const otherPartySafe = new ProcessNode(this);
        otherPartySafe.title = "Enter safe address to trust";
        otherPartySafe.state = State.Active;
        otherPartySafe.action = async () =>
        {
            console.log("Enter safe address to trust")
        };
        otherPartySafe.quant = "OmoSafeLookup";

        const trustPercentage = new ProcessNode(this);
        trustPercentage.title = "Enter trust percentage";
        trustPercentage.action = async () =>
        {
            console.log("Enter trust percentage")
        };
        trustPercentage.quant = "OmoDialogContent";

        this.children = [
            otherPartySafe,
            trustPercentage
        ];
    }
}

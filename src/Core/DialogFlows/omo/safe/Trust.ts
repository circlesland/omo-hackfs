import {Node, State} from "../../Node"

export class Trust extends Node
{
    title = "Trust someone";

    constructor()
    {
        super(null);

        const otherPartySafe = new Node(this);
        otherPartySafe.title = "Enter safe address to trust";
        otherPartySafe.state = State.Active;
        otherPartySafe.action = async () =>
        {
            console.log("Enter safe address to trust")
        };

        const trustPercentage = new Node(this);
        trustPercentage.title = "Enter trust percentage";
        trustPercentage.action = async () =>
        {
            console.log("Enter trust percentage")
        };

        this.children = [
            otherPartySafe,
            trustPercentage
        ];
    }
}

import {Event} from "../../../Event"

export class Transfer extends Event
{
    readonly _$eventType = "omo.safe.transfer";

    data: {
        spendSafeOwner: { // Owner of the giveTrust-taking safe
            address: string,
            privateKey: string
        },
        spendSafe: string,
        receivingSafe: string,
        amount: number
    }|undefined = undefined;
}

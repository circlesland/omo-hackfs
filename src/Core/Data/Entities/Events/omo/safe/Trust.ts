import {Event} from "../../../Event"

export class Trust extends Event
{
    readonly _$eventType = "omo.safe.giveTrust";

    data: {
        trustGiver: { // Owner of the giveTrust-giving safe
            address: string,
            privateKey: string
        },
        trustGiverSafe: string, // The giveTrust-giving safe (web3.utils.toChecksumAddress(window.o.odentity.current.circleSafe.safeAddress.trim());)
        trustReceiverSafe: string, // The giveTrust-receiving safe (web3.utils.toChecksumAddress(trustSafeAddress.trim()))
    }|undefined = undefined;
}

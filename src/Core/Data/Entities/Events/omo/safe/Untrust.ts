import {Event} from "../../../Event"

export class Untrust extends Event
{
    readonly _$eventType = "omo.safe.untrust";

    data: {
        formerTrustGiver: { // Owner of the giveTrust-giving safe
            address: string,
            privateKey: string
        },
        formerTrustGiverSafe: string, // The giveTrust-giving safe (web3.utils.toChecksumAddress(window.o.odentity.current.circleSafe.safeAddress.trim());)
        formerTrustReceiverSafe: string, // The giveTrust-receiving safe (web3.utils.toChecksumAddress(trustSafeAddress.trim()))
    }|undefined = undefined;
}

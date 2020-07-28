import {Event} from "../../../Event"

export class Untrust extends Event
{
    readonly _$eventType = "omo.safe.untrust";

    data: {
        formerTrustGiver: { // Owner of the trust-giving safe
            address: string,
            privateKey: string
        },
        formerTrustGiverSafe: string, // The trust-giving safe (web3.utils.toChecksumAddress(window.o.odentity.current.circleSafe.safeAddress.trim());)
        formerTrustReceiverSafe: string, // The trust-receiving safe (web3.utils.toChecksumAddress(trustSafeAddress.trim()))
    }|undefined = undefined;
}

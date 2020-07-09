import { IdentityProviderInterface } from "./IdentityProviderInterface";
import { Omo } from "../Core/Entities/Omo";
import { OmoStore } from "../Core/Store/OmoStore";
import { LoginRequest } from "../Core/Entities/LoginRequest";
import { IdentityProvider } from "../Core/Entities/IdentityProvider";

export class EmailProvider implements IdentityProviderInterface {
    store = OmoStore.getInstance();

    async loginOmo(loginRequest: LoginRequest, providerIdentity: IdentityProvider): Promise<Omo | null> {
        console.log("provider", providerIdentity)
        window['Email'].send({
            Host: process.env.SMTPHOST,
            Username: process.env.SMTPUSER,
            Password: process.env.SMTPPASSWORD,
            To: providerIdentity.externalReference,
            From: 'team@omo.earth',
            Subject: `Magic login link`,
            Body: `Please follow this link to login <a target="_blank" href="${window.location.protocol}//${window.location.host}/?page=magicLogin&accept=${loginRequest._id}">chat now</a>`
        }).then(
            message => console.log("MAIL", message)
        )
        return null;
    }


}
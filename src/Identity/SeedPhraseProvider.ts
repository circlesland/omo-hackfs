import { IdentityProviderInterface } from "./IdentityProviderInterface";
import { OdentityEntity } from "../core/Data/Entities/OdentityEntity";
import { LoginRequest } from "../core/Data/Entities/LoginRequest";
import { OdentityProvider } from "../core/Data/Entities/OdentityProvider";

export class SeedPhraseProvider implements IdentityProviderInterface {
    async    login(loginRequest: LoginRequest, providerIdentity: OdentityProvider): Promise<OdentityEntity | null> {

        // Email cannot login directly so this has to be handled by Listenig to Request Changes
        return null;
    }


}

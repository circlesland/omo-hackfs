import { IdentityProviderInterface } from "./IdentityProviderInterface";
import { OdentityEntity } from "./../Data/Entities/OdentityEntity";
import { LoginRequest } from "./../Data/Entities/LoginRequest";
import { OdentityProvider } from "./../Data/Entities/OdentityProvider";

export class SeedPhraseProvider implements IdentityProviderInterface {
    async    login(loginRequest: LoginRequest, providerIdentity: OdentityProvider): Promise<OdentityEntity | null> {

        // Email cannot login directly so this has to be handled by Listenig to Request Changes
        return null;
    }


}

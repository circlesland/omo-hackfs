import { OdentityEntity } from "../core/Data/Entities/OdentityEntity";
import { LoginRequest } from "../core/Data/Entities/LoginRequest";
import { OdentityProvider } from "../core/Data/Entities/OdentityProvider";

export interface IdentityProviderInterface {
    login(loginRequest: LoginRequest, providerIdentity: OdentityProvider): Promise<OdentityEntity | null>;
}

import { AuthServiceConfig,GoogleLoginProvider } from "angular5-social-login";

export function getAuthServiceConfigs() {
    let config = new AuthServiceConfig([{
        id: GoogleLoginProvider.PROVIDER_ID,
        //PROD
        provider: new GoogleLoginProvider("221017604524-qf91uilhvipme72fmesj4ag0fuegi3nd.apps.googleusercontent.com")
        //Local
        //provider: new GoogleLoginProvider("1078712008081-tgdr6je72gotima3c66uli90he8g5lmg.apps.googleusercontent.com")
    }]);
    
    return config;
}
import JWTDecoder from 'jwt-decode';
import CookieParser from 'cookieparser';

export const actions = {
  nuxtServerInit({ commit }, { req }){
    if(process.server && process.static) return;
    if(!req.headers.cookie) return;

    const Parsed = CookieParser.parse(req.headers.cookie);
    const AccessToken = Parsed.UserAccessToken;

    if(!AccessToken) return;

    const Decoded = JWTDecoder(AccessToken);

    if(Decoded){
      commit('userAuthentication/SET_USER', {
        uid: Decoded.user_id,
        email : Decoded.email,
        emailVerified: Decoded.emailVerified,
        photoURL : Decoded.photoURL
      })
    }
  }
}

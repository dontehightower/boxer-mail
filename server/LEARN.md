# Authentication with PassportJS

"Passport is authentication middleware for Node. It is designed to serve a singular purpose: authenticate requests."

## Strategies

## Sign up w/ Google OAuth API

[Register for Google OAuth API](https://console.developers.google.com/?pli=1)

New Project

#### Enable Google OAuth API

Sign up for Google + API
Generate an API credential

#### Securing API Keys

clientID is fine, it is public information
clientSecret should not be shared with anyone, access to the client secret provides elevated permissions to anyone who has it.

#### Google Strategy Options

`passport.authenticate(strategy, scope)`

Google has a list of the scopes, or permissions that can be requested when using OAuth for a user's account

#### Access and Refresh Tokens

Access Token allows the application to access profile data for a given user. It is provided afrer the `auth/google/callback` route is hit.

The function created as the second argument of the GoogleStrategy can also access some other relevant information. Mainly, the profile variable, which contains user information such as name, gender, email addresses, etc.

```javascript
(accessToken, refreshToken, profile, done) => {
  console.log('accessToken', accessToken);
  console.log('refresh token', refreshToken);
  console.log('profile', profile);
  console.log('done', done);
};
```

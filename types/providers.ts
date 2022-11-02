// Add interfaces for the providers' schema

interface GoogleOAuthJson {
  sub: string;
  name: string;
  given_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
}

export {
  GoogleOAuthJson
}

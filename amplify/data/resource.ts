import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Tutorial: a
    .model({
      title: a.string().required(),
      description: a.string().required(),
      youtubelink: a.string(),
      storelink: a.string(),
      bloglink: a.string(),
      imagelink: a.string(),
      storepriority: a.string(),
      displayorder: a.integer().required(),
      imagename: a.string(),
    })
    .authorization((allow) => [allow.authenticated()]),
  
  Whitelist: a
    .model({
      email: a.string().required(),
      name: a.string(),
    })
    .authorization((allow) => [allow.authenticated()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
import { Access } from "@src/generated/graphql-endpoint.types"

export const AccessOptions: {
    [key in Access]: {
      name: string
      matIcon: string
    }
  } = {
    [Access.Open]: {
      name: "Open",
      matIcon: "lock_open"
    },
    [Access.Invite]: {
      name: "Invite",
      matIcon: "mail"
    },
    [Access.Closed]: {
      name: "Closed",
      matIcon: "close"
    }
  }
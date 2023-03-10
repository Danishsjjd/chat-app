export type Chat = {
  // ! root doc have same id as ChatBetween
  id: string
  username: string
  message?: string
  file?: string
  createAt: Date // <- index here
}

export type ChatBetween = {
  // ! save id as Chat
  latestMessage: string
  users: string[]
  createdAt: Date
}

export type ChatUser = {
  photoURL: string
  username: string
  isReadLatestMsg: boolean
}

export type ChatRelatedUsers = ChatUser & {
  chatId: string
  latestMessage: string
  createdAt: Date
}

export type ChatCallback = ChatRelatedUsers & { users: string[] }
import {
  LOGIN,
  GET_REMAINING_MESSAGES,
  GET_MESSAGE,
  SEND_MESSAGE,
  SEND_MESSAGE_LOCAL,
  SEND_MESSAGE_FAILURE,
  SET_CURRENT_CHAT,
  RESET_CURRENT_CHAT,
  SET_REPLY,
  REMOVE_REPLY,
  REHYDRATE,
  LOGOUT,
  REMOVE_CHAT,
  NEW_CHAT,
  SET_READ_MESSAGE,
  SET_DELIVERED_MESSAGE,
} from "../actions/types";
import { find, filter, orderBy, some, isEmpty, reject, map, unionBy, reduce, includes } from "lodash";
import config from "../../config";

export default function chat(
  state = {
    chats: [],
    messages: [],
    current: {},
    reply: {},
  },
  action
) {
  const { type, payload } = action;
  switch (type) {
    /* case LOGIN:
      return {
        ...state,
        current: {},
        reply: {},
      }; */

    case LOGOUT:
      return {
        ...state,
        current: {},
        reply: {},
      };

    case REHYDRATE:
      return {
        ...state,
        chats: payload.data.chat.chats,
        messages: payload.data.chat.messages,
        current: payload.data.chat.current,
        reply: payload.data.chat.payload,
      };

    case SET_CURRENT_CHAT:
      const chat = find(state.chats, { chatId: payload.data });
      const chatMsgs = orderBy(
        filter(state.messages, ({ chatId }) => chatId === payload.data),
        ["createdDate"],
        ["asc"]
      );
      const clearChat = map(state.chats, (item) => {
        if (item.chatId === payload.data) return { ...item, count: 0 };
        return item;
      });
      return {
        ...state,
        chats: clearChat,
        current: { ...chat, messages: chatMsgs },
      };

    case RESET_CURRENT_CHAT:
      return {
        ...state,
        current: {},
        reply: {},
      };

    case NEW_CHAT:
      const newChat = { ...payload.data, count: 0 };
      return {
        ...state,
        chats: [...state.chats, newChat],
        current: { ...newChat, messages: [] },
      };

    case SET_REPLY:
      return {
        ...state,
        reply: payload.data,
      };

    case REMOVE_REPLY:
      return {
        ...state,
        reply: {},
      };

    case GET_REMAINING_MESSAGES:
      const mergeChats = unionBy(state.chats, payload.data.chats, "chatId");
      const mergeMessages = unionBy(state.messages, payload.data.messages, "messageId");
      const mappedChats = map(mergeChats, (item) => {
        const count = reduce(payload.data.messages, (total, msg) => total + (msg.chatId === item.chatId ? 1 : 0), 0);
        return { ...item, count };
      });
      return {
        ...state,
        chats: mappedChats,
        messages: mergeMessages,
      };

    case GET_MESSAGE:
      const convExists = some(state.chats, { chatId: payload.data.chats.chatId });
      const isChatting = !isEmpty(state.current) && state.current.chatId === payload.data.chats.chatId;
      const messageExists = some(state.messages, { messageId: payload.data.messages.messageId });
      const mappedMessage2 = { ...payload.data.messages, mediaUrl: payload.data.messages.mediaUrl ? config.apiURL + payload.data.messages.mediaUrl : null };
      if (messageExists) {
        return { ...state };
      }
      if (isChatting) {
        //Add or Update Message, Update Current
        const currentMessages = filter(state.messages, ({ chatId }) => chatId === payload.data.messages.chatId);
        return {
          ...state,
          messages: [...state.messages, mappedMessage2],
          current: { ...state.current, messages: [...currentMessages, mappedMessage2] },
        };
      } else {
        if (convExists) {
          //Add or Update Message,
          const mappedConversations = map(state.chats, (item) => {
            if (item.chatId === payload.data.chats.chatId) return { ...item, count: item.count + 1 };
            return item;
          });
          return {
            ...state,
            chats: mappedConversations,
            messages: [...state.messages, mappedMessage2],
          };
        } else {
          //Add Conversation, Add Message,
          const mappedConversation = { ...payload.data.chats, count: 1 };
          return {
            ...state,
            chats: [...state.chats, mappedConversation],
            messages: [...state.messages, mappedMessage2],
          };
        }
      }

    case SEND_MESSAGE:
      const cleanMsgs2 = map(state.messages, (item) => {
        if (item.messageId === payload.data) return { ...item, statusCode: 1 };
        return item;
      });
      const cleanCurrent2 = map(state.current.messages, (item) => {
        if (item.messageId === payload.data) return { ...item, statusCode: 1 };
        return item;
      });
      return {
        ...state,
        messages: cleanMsgs2,
        current: { ...state.current, messages: cleanCurrent2 },
      };

    case SEND_MESSAGE_LOCAL:
      return {
        ...state,
        messages: [...state.messages, payload.data],
        current: { ...state.current, messages: [...state.current.messages, payload.data] },
        reply: {},
      };

    // case SEND_MESSAGE_FAILURE:
    //   const mappedMessage4 = reject(state.messages, (item) => {
    //     if (item.conversationID === payload.data.chatMsg.conversationID && item._id === payload.data.chatMsg._id) return true;
    //     return false;
    //   });
    //   const currentMsgs2 = [...state.current.messages, mappedMessage4];
    //   return {
    //     ...state,
    //     messages: [...state.messages, mappedMessage4],
    //     current: { ...state.current, messages: currentMsgs2 },
    //     reply: {},
    //   };

    case REMOVE_CHAT:
      const clearConversations3 = reject(state.chats, { chatId: payload.data });
      const clearMessages3 = reject(state.messages, { chatId: payload.data });
      return {
        ...state,
        chats: clearConversations3,
        messages: clearMessages3,
        current: {},
        reply: {},
      };

    case SET_READ_MESSAGE:
      const readMessages = map(state.messages, (item) => {
        if (includes(payload.data.messages, item.messageId)) return { ...item, statusCode: 3 };
        return item;
      });
      if (isEmpty(state.current)) {
        return {
          ...state,
          messages: readMessages,
        };
      }
      const currentMsgs = orderBy(
        filter(readMessages, ({ chatId }) => chatId === state.current.chatId),
        ["createdDate"],
        ["asc"]
      );
      return {
        ...state,
        messages: readMessages,
        current: { ...state.current, messages: currentMsgs },
      };

    case SET_DELIVERED_MESSAGE:
      const deliveredMessages = map(state.messages, (item) => {
        if (includes(payload.data.messages, item.messageId)) return { ...item, statusCode: 2 };
        return item;
      });
      if (isEmpty(state.current)) {
        return {
          ...state,
          messages: deliveredMessages,
        };
      }
      const currentMsgs2 = orderBy(
        filter(deliveredMessages, ({ chatId }) => chatId === state.current.chatId),
        ["createdDate"],
        ["asc"]
      );
      return {
        ...state,
        messages: deliveredMessages,
        current: { ...state.current, messages: currentMsgs2 },
      };

    default:
      return state;
  }
}

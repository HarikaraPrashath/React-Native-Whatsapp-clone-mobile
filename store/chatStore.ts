import {create} from "zustand"
interface Chat{
    participants:[],
    lastMessage:Object,
    unreadCounts:Object
}

interface ChatState{
    chats:Chat[],
    setChats:(chats:Chat[])=>void,
    getUnreadChatCount:()=>number 
}

function isUnread(unreadCounts:Object){
   return Object.values(unreadCounts).some(val => val > 0)
}

export const useChatStore = create<ChatState>((set,get)=>({
    chats:[],
    setChats:(chats:Chat[])=>set({chats}),
    getUnreadChatCount:()=>get().chats.filter(c => isUnread(c.unreadCounts)).length

}))
"use client"

import { use, useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Plus,
  Video,
  Phone,
  MoreHorizontal,
  Paperclip,
  Smile,
  Mic,
  Send,
  Check,
  CheckCheck,
} from "lucide-react"
import { pusherClient } from "@/lib/pusher"
import { sendMessage } from "@/actions/send-message"
import { useParams } from "next/navigation"

interface Chat {
  id: string
  name: string
  avatar: string
  lastMessage: string
  timestamp: string
  unreadCount?: number
  isOnline: boolean
  initials: string
}

interface Message {
  id: string
  text: string
  timestamp: string
  isSent: boolean
  isRead: boolean
  images?: string[]
}

const chats: Chat[] = [
  {
    id: "1",
    name: "Jacquenetta Slowgrave",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Great! Looking forward to it...",
    timestamp: "10 minutes",
    unreadCount: 3,
    isOnline: true,
    initials: "JS",
  },
  {
    id: "2",
    name: "Nickola Peever",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Sounds perfect! I've been wa...",
    timestamp: "40 minutes",
    unreadCount: 2,
    isOnline: true,
    initials: "NP",
  },
  {
    id: "3",
    name: "Farand Hume",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "How about 7 PM at the new Italia...",
    timestamp: "Yesterday",
    isOnline: true,
    initials: "FH",
  },
  {
    id: "4",
    name: "Ossie Peasey",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Hey Bonnie, yes, definitely! What ...",
    timestamp: "13 days",
    isOnline: false,
    initials: "OP",
  },
  {
    id: "5",
    name: "Hall Negri",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "No worries at all! I'll grab a table ...",
    timestamp: "2 days",
    isOnline: false,
    initials: "HN",
  },
  {
    id: "6",
    name: "Elyssa Segot",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "She just told me today.",
    timestamp: "Yesterday",
    isOnline: true,
    initials: "ES",
  },
  {
    id: "7",
    name: "Gil Wilfing",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "See you in 5 minutes!",
    timestamp: "1 day",
    isOnline: false,
    initials: "GW",
  },
  {
    id: "8",
    name: "Bab Cleaton",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "If it takes long you can mail",
    timestamp: "3 hours",
    isOnline: false,
    initials: "BC",
  },
  {
    id: "9",
    name: "Janith Satch",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "It's amazing to s...",
    timestamp: "1 day",
    unreadCount: 2,
    isOnline: false,
    initials: "JS",
  },
]

const messages: Message[] = [
  {
    id: "1",
    text: "I know how important this file is to you. You can trust me :) I know how important this file is to you. You can trust me :) know how important this file is to you. You can trust me :)",
    timestamp: "05:23 PM",
    isSent: false,
    isRead: true,
  },
  {
    id: "2",
    text: "Sorry :( send you as soon as possible.",
    timestamp: "05:23 PM",
    isSent: true,
    isRead: true,
  },
  {
    id: "3",
    text: "I know how important this file is to you. You can trust me :) me :)",
    timestamp: "05:23 PM",
    isSent: true,
    isRead: true,
  },
  {
    id: "4",
    text: "",
    timestamp: "05:23 PM",
    isSent: true,
    isRead: true,
    images: ["/placeholder.svg?height=120&width=120", "/placeholder.svg?height=120&width=120"],
  },
]

export default function ChatApp() {
  // const [selectedChat, setSelectedChat] = useState<Chat>(chats[1])
  const [searchQuery, setSearchQuery] = useState("")
  const [messageInput, setMessageInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [conversationId, setConversationId] = useState("")
  pusherClient.subscribe('chat');
  const filteredChats = chats.filter((chat) => chat.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const params = useParams(); // ✅ Works in App Router
  const chatId = params?.id as string; // from `/chat/[chatId]`

  const fetchMessages = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/chat/get-messages?conversationId=${conversationId}`)
      if (!res.ok) throw new Error('Failed to fetch messages')
      const data = await res.json()
      setMessages(data)
      console.log(data)
    } catch (err) {
      console.error("Error fetching messages:", err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch on component mount and when conversation changes
  useEffect(() => {
    if (conversationId) {
      fetchMessages()
    }
  }, [conversationId])

const handleSendMessage = async () => {
  if (!messageInput.trim() || !conversationId || !currentUserId) return;

  try {
    await sendMessage({
      content: messageInput,
      conversationId: conversationId,
      senderId: currentUserId,
    });
    setMessageInput("");
  } catch (error) {
    // Show error to user
    setError("Failed to send message");
  }
};

  const selectedChat = chats.find((chat) => chat.id === chatId)

  return (
    <div className="flex  bg-gray-50 w-full">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedChat?.avatar || "/placeholder.svg"} alt={selectedChat?.name} />
                  <AvatarFallback className="bg-blue-500 text-white">{selectedChat?.initials}</AvatarFallback>
                </Avatar>
                {selectedChat?.isOnline && (
                  <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-white rounded-full" />
                )}
              </div>
              <div className="ml-3">
                <h2 className="text-lg font-semibold text-gray-900">{selectedChat?.name}</h2>
                <p className="text-sm text-green-600">Online</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Video className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Phone className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-xs lg:max-w-md ${message.isSent ? "order-2" : "order-1"}`}>
                  {message.images ? (
                    <div className="flex space-x-2 mb-2">
                      {message.images.map((image, index) => (
                        <img
                          key={index}
                          src={image || "/placeholder.svg"}
                          alt="Shared image"
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  ) : (
                    <div
                      className={`px-4 py-2 rounded-2xl ${message.isSent ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"
                        }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                  )}

                  <div
                    className={`flex items-center mt-1 space-x-1 ${message.isSent ? "justify-end" : "justify-start"}`}
                  >
                    <span className="text-xs text-gray-500">{message.timestamp}</span>
                    {message.isSent && <CheckCheck className="h-3 w-3 text-blue-500" />}
                  </div>
                </div>

                <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 hover:opacity-100">
                  <MoreHorizontal className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <Input
                placeholder="your message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="pr-32 py-3 rounded-full border-gray-300"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Smile className="h-4 w-4 text-gray-500" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Paperclip className="h-4 w-4 text-gray-500" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Mic className="h-4 w-4 text-gray-500" />
                </Button>
              </div>
            </div>

            <Button onClick={handleSendMessage} className="rounded-full h-10 w-10 p-0 bg-blue-500 hover:bg-blue-600">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

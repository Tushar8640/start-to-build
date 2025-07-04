"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
    Search,
    Plus,
    Check,
} from "lucide-react"
import { pusherClient } from "@/lib/pusher"
import { useRouter } from "next/navigation"
import LogoutButton from "../(auth)/logout-button"

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

export default function ChatApp({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [selectedChat, setSelectedChat] = useState<Chat>(chats[1])
    const [searchQuery, setSearchQuery] = useState("")
    const [messageInput, setMessageInput] = useState("")
    const router = useRouter()
    const filteredChats = chats.filter((chat) => chat.name.toLowerCase().includes(searchQuery.toLowerCase()))

    useEffect(() => {

        const channel = pusherClient.subscribe('chat');

        channel.bind('message', (data: any) => {
            console.log('Received message:', data);
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, []);

    return (
        <div className="h-screen min-w-5xl max-w-7xl mx-auto -lg py-5 flex justify-center items-center">
            {/* Sidebar */}
            <LogoutButton />
            <div className="border rounded w-full flex">
                <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
                    {/* Header */}
                    <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-xl font-semibold text-gray-900">Chats</h1>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Chats search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 bg-gray-50 border-gray-200"
                            />
                        </div>
                    </div>

                    {/* Chat List */}
                    <ScrollArea className="flex-1">
                        <div className="p-2">
                            {filteredChats.map((chat) => (
                                <div
                                    key={chat.id}
                                    onClick={() => {
                                        setSelectedChat(chat);
                                        router.push(`/chat/${chat.id}`)
                                    }}
                                    className={`flex items-center p-3 rounded-lg cursor-pointer border   hover:bg-gray-50 ${selectedChat.id === chat.id ? "bg-blue-50  border-blue-200" : "border-transparent"
                                        }`}
                                >
                                    <div className="relative">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={chat.avatar || "/placeholder.svg"} alt={chat.name} />
                                            <AvatarFallback className="bg-blue-500 text-white text-sm">{chat.initials}</AvatarFallback>
                                        </Avatar>
                                        {chat.isOnline && (
                                            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-white rounded-full" />
                                        )}
                                    </div>

                                    <div className="ml-3 flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium text-gray-900 truncate">{chat.name}</p>
                                            <span className="text-xs text-gray-500">{chat.timestamp}</span>
                                        </div>
                                        <div className="flex items-center justify-between mt-1">
                                            <p className="text-sm text-gray-600 truncate flex items-center">
                                                <Check className="h-3 w-3 mr-1 text-gray-400" />
                                                {chat.lastMessage}
                                            </p>
                                            {chat.unreadCount && (
                                                <Badge className="bg-green-500 hover:bg-green-600 h-5 w-5 p-0 flex items-center justify-center text-xs">
                                                    {chat.unreadCount}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </div>

                {children}
            </div>
        </div>
    )
}



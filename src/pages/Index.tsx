import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import ChatView from '@/components/ChatView';
import ContactsView from '@/components/ContactsView';
import StoriesView from '@/components/StoriesView';
import ProfileView from '@/components/ProfileView';
import SettingsView from '@/components/SettingsView';

type Message = {
  id: number;
  text: string;
  sender: 'me' | 'other';
  time: string;
};

type Chat = {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  messages: Message[];
};

type Contact = {
  id: number;
  name: string;
  avatar: string;
  status: string;
  online: boolean;
};

type Story = {
  id: number;
  name: string;
  avatar: string;
  viewed: boolean;
};

const initialChats: Chat[] = [
  { 
    id: 1, 
    name: 'Анна Иванова', 
    avatar: '👩', 
    lastMessage: 'Привет! Как дела?', 
    time: '12:45', 
    unread: 3, 
    online: true,
    messages: [
      { id: 1, text: 'Привет! Как дела?', sender: 'other', time: '12:40' },
      { id: 2, text: 'Отлично! А у тебя?', sender: 'me', time: '12:42' },
      { id: 3, text: 'Тоже хорошо! Хотела спросить про встречу', sender: 'other', time: '12:43' },
      { id: 4, text: 'Да, конечно! Во сколько удобно?', sender: 'me', time: '12:44' },
      { id: 5, text: 'В 15:00 подойдет?', sender: 'other', time: '12:45' },
    ]
  },
  { 
    id: 2, 
    name: 'Команда GG', 
    avatar: '👥', 
    lastMessage: 'Встреча в 15:00', 
    time: '11:20', 
    unread: 0, 
    online: false,
    messages: [
      { id: 1, text: 'Всем привет!', sender: 'other', time: '11:15' },
      { id: 2, text: 'Встреча в 15:00', sender: 'other', time: '11:20' },
    ]
  },
  { 
    id: 3, 
    name: 'Дмитрий', 
    avatar: '👨', 
    lastMessage: 'Отправил файлы', 
    time: 'Вчера', 
    unread: 1, 
    online: true,
    messages: [
      { id: 1, text: 'Отправил файлы', sender: 'other', time: 'Вчера' },
    ]
  },
  { 
    id: 4, 
    name: 'Мама', 
    avatar: '👩‍🦰', 
    lastMessage: 'Не забудь позвонить', 
    time: 'Вчера', 
    unread: 0, 
    online: false,
    messages: [
      { id: 1, text: 'Не забудь позвонить', sender: 'other', time: 'Вчера' },
    ]
  },
];

const mockContacts: Contact[] = [
  { id: 1, name: 'Анна Иванова', avatar: '👩', status: 'В сети', online: true },
  { id: 2, name: 'Дмитрий', avatar: '👨', status: 'В сети', online: true },
  { id: 3, name: 'Елена', avatar: '👱‍♀️', status: 'Была 5 минут назад', online: false },
  { id: 4, name: 'Максим', avatar: '👦', status: 'Был час назад', online: false },
];

const mockStories: Story[] = [
  { id: 1, name: 'Анна', avatar: '👩', viewed: false },
  { id: 2, name: 'Дмитрий', avatar: '👨', viewed: false },
  { id: 3, name: 'Команда', avatar: '👥', viewed: true },
  { id: 4, name: 'Елена', avatar: '👱‍♀️', viewed: false },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState<'chats' | 'contacts' | 'stories' | 'profile' | 'settings'>('chats');
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(initialChats[0]);
  const [newMessage, setNewMessage] = useState('');
  const [stories, setStories] = useState<Story[]>(mockStories);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    username: '@myusername',
    status: 'В сети',
    bio: 'Люблю общаться в GGchat! 🚀'
  });

  const getCurrentTime = () => {
    const now = new Date();
    return now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
  };

  const handleChatSelect = (chat: Chat) => {
    const updatedChats = chats.map(c => 
      c.id === chat.id ? { ...c, unread: 0 } : c
    );
    setChats(updatedChats);
    const updatedChat = updatedChats.find(c => c.id === chat.id);
    setSelectedChat(updatedChat || null);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      const newMsg: Message = {
        id: selectedChat.messages.length + 1,
        text: newMessage.trim(),
        sender: 'me',
        time: getCurrentTime()
      };

      const updatedChats = chats.map(chat => {
        if (chat.id === selectedChat.id) {
          return {
            ...chat,
            messages: [...chat.messages, newMsg],
            lastMessage: newMsg.text,
            time: newMsg.time,
            unread: 0
          };
        }
        return chat;
      });

      setChats(updatedChats);
      const updatedSelectedChat = updatedChats.find(c => c.id === selectedChat.id);
      if (updatedSelectedChat) {
        setSelectedChat(updatedSelectedChat);
      }
      setNewMessage('');
    }
  };

  const handleStoryClick = (story: Story) => {
    setSelectedStory(story);
    const updatedStories = stories.map(s => 
      s.id === story.id ? { ...s, viewed: true } : s
    );
    setStories(updatedStories);
  };

  const handleCloseStory = () => {
    setSelectedStory(null);
  };

  const handleSaveProfile = () => {
    setIsEditingProfile(false);
  };

  return (
    <div className="h-screen flex bg-background text-foreground overflow-hidden">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'chats' && (
        <ChatView
          chats={chats}
          selectedChat={selectedChat}
          newMessage={newMessage}
          onChatSelect={handleChatSelect}
          onMessageChange={setNewMessage}
          onSendMessage={handleSendMessage}
        />
      )}

      {activeTab === 'contacts' && (
        <ContactsView contacts={mockContacts} />
      )}

      {activeTab === 'stories' && (
        <StoriesView
          stories={stories}
          selectedStory={selectedStory}
          onStoryClick={handleStoryClick}
          onCloseStory={handleCloseStory}
        />
      )}

      {activeTab === 'profile' && (
        <ProfileView
          profileData={profileData}
          isEditing={isEditingProfile}
          onEdit={() => setIsEditingProfile(true)}
          onSave={handleSaveProfile}
          onCancel={() => setIsEditingProfile(false)}
          onDataChange={setProfileData}
        />
      )}

      {activeTab === 'settings' && (
        <SettingsView />
      )}
    </div>
  );
};

export default Index;

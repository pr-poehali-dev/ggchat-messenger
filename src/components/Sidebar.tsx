import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

type SidebarProps = {
  activeTab: 'chats' | 'contacts' | 'stories' | 'profile' | 'settings';
  onTabChange: (tab: 'chats' | 'contacts' | 'stories' | 'profile' | 'settings') => void;
};

const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  return (
    <div className="w-20 bg-sidebar flex flex-col items-center py-6 gap-6 border-r border-sidebar-border">
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl font-bold animate-scale-in">
        GG
      </div>
      
      <nav className="flex flex-col gap-4 flex-1">
        <Button
          variant={activeTab === 'chats' ? 'default' : 'ghost'}
          size="icon"
          className="w-12 h-12 rounded-2xl transition-all hover:scale-110"
          onClick={() => onTabChange('chats')}
        >
          <Icon name="MessageCircle" size={24} />
        </Button>
        <Button
          variant={activeTab === 'contacts' ? 'default' : 'ghost'}
          size="icon"
          className="w-12 h-12 rounded-2xl transition-all hover:scale-110"
          onClick={() => onTabChange('contacts')}
        >
          <Icon name="Users" size={24} />
        </Button>
        <Button
          variant={activeTab === 'stories' ? 'default' : 'ghost'}
          size="icon"
          className="w-12 h-12 rounded-2xl transition-all hover:scale-110"
          onClick={() => onTabChange('stories')}
        >
          <Icon name="Zap" size={24} />
        </Button>
      </nav>

      <div className="flex flex-col gap-4">
        <Button
          variant={activeTab === 'settings' ? 'default' : 'ghost'}
          size="icon"
          className="w-12 h-12 rounded-2xl transition-all hover:scale-110"
          onClick={() => onTabChange('settings')}
        >
          <Icon name="Settings" size={24} />
        </Button>
        <Button
          variant={activeTab === 'profile' ? 'default' : 'ghost'}
          size="icon"
          className="w-12 h-12 rounded-2xl transition-all hover:scale-110"
          onClick={() => onTabChange('profile')}
        >
          <Avatar className="w-12 h-12 border-2 border-primary">
            <AvatarFallback className="bg-gradient-to-br from-accent to-secondary text-white">🚀</AvatarFallback>
          </Avatar>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

type Story = {
  id: number;
  name: string;
  avatar: string;
  viewed: boolean;
};

type StoriesViewProps = {
  stories: Story[];
  selectedStory: Story | null;
  onStoryClick: (story: Story) => void;
  onCloseStory: () => void;
};

const StoriesView = ({ stories, selectedStory, onStoryClick, onCloseStory }: StoriesViewProps) => {
  return (
    <div className="flex-1 flex flex-col animate-fade-in">
      <div className="p-6 border-b border-border bg-card">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Статусы
        </h2>
      </div>
      <ScrollArea className="flex-1 p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {stories.map((story) => (
            <div
              key={story.id}
              className="cursor-pointer group animate-scale-in hover:scale-105 transition-all"
              onClick={() => onStoryClick(story)}
            >
              <div
                className={`relative mb-2 rounded-3xl p-1 ${
                  story.viewed
                    ? 'bg-muted'
                    : 'bg-gradient-to-br from-primary via-secondary to-accent'
                }`}
              >
                <Avatar className="w-full aspect-square">
                  <AvatarFallback className="text-5xl">{story.avatar}</AvatarFallback>
                </Avatar>
              </div>
              <p className="text-sm text-center font-medium">{story.name}</p>
            </div>
          ))}
        </div>
        {selectedStory && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center animate-fade-in" onClick={onCloseStory}>
            <div className="relative max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
              <Button
                size="icon"
                variant="ghost"
                className="absolute -top-12 right-0 text-white hover:bg-white/20 rounded-full"
                onClick={onCloseStory}
              >
                <Icon name="X" size={24} />
              </Button>
              <div className="bg-gradient-to-br from-primary via-secondary to-accent p-1 rounded-3xl">
                <div className="bg-background rounded-3xl p-8 text-center">
                  <Avatar className="w-32 h-32 mx-auto mb-4">
                    <AvatarFallback className="text-6xl">{selectedStory.avatar}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-2xl font-bold mb-2">{selectedStory.name}</h3>
                  <p className="text-muted-foreground">Статус пользователя</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default StoriesView;

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type ProfileData = {
  username: string;
  status: string;
  bio: string;
};

type ProfileViewProps = {
  profileData: ProfileData;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onDataChange: (data: ProfileData) => void;
};

const ProfileView = ({ 
  profileData, 
  isEditing, 
  onEdit, 
  onSave, 
  onCancel, 
  onDataChange 
}: ProfileViewProps) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center animate-fade-in">
      <div className="max-w-md w-full p-8 rounded-3xl bg-card border border-border">
        <div className="text-center mb-8">
          <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-primary">
            <AvatarFallback className="text-6xl bg-gradient-to-br from-primary to-secondary">🚀</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-bold mb-2">Мой профиль</h2>
          <p className="text-muted-foreground">user@ggchat.com</p>
        </div>
        <div className="space-y-4">
          {isEditing ? (
            <>
              <div className="p-4 rounded-2xl bg-muted">
                <p className="text-sm text-muted-foreground mb-2">Имя пользователя</p>
                <Input 
                  value={profileData.username} 
                  onChange={(e) => onDataChange({...profileData, username: e.target.value})}
                  className="bg-background border-border rounded-xl"
                />
              </div>
              <div className="p-4 rounded-2xl bg-muted">
                <p className="text-sm text-muted-foreground mb-2">Статус</p>
                <Input 
                  value={profileData.status} 
                  onChange={(e) => onDataChange({...profileData, status: e.target.value})}
                  className="bg-background border-border rounded-xl"
                />
              </div>
              <div className="p-4 rounded-2xl bg-muted">
                <p className="text-sm text-muted-foreground mb-2">О себе</p>
                <Input 
                  value={profileData.bio} 
                  onChange={(e) => onDataChange({...profileData, bio: e.target.value})}
                  className="bg-background border-border rounded-xl"
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  className="flex-1 rounded-2xl bg-gradient-to-r from-primary to-secondary"
                  onClick={onSave}
                >
                  Сохранить
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 rounded-2xl"
                  onClick={onCancel}
                >
                  Отмена
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="p-4 rounded-2xl bg-muted">
                <p className="text-sm text-muted-foreground mb-1">Имя пользователя</p>
                <p className="font-semibold">{profileData.username}</p>
              </div>
              <div className="p-4 rounded-2xl bg-muted">
                <p className="text-sm text-muted-foreground mb-1">Статус</p>
                <p className="font-semibold">{profileData.status}</p>
              </div>
              <div className="p-4 rounded-2xl bg-muted">
                <p className="text-sm text-muted-foreground mb-1">О себе</p>
                <p className="font-semibold">{profileData.bio}</p>
              </div>
              <Button 
                className="w-full rounded-2xl bg-gradient-to-r from-primary to-secondary"
                onClick={onEdit}
              >
                Редактировать профиль
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileView;

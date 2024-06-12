
interface Window {
    onTelegramAuth: (user: {
      id: number;
      first_name: string;
      last_name: string;
      username?: string;
    }) => void;
  }
  
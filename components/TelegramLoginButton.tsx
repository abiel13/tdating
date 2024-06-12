'use client'
// components/TelegramLogin.js
import { useEffect } from 'react';

const TelegramLoginButton = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.async = true;
    script.setAttribute('data-telegram-login', 'testdate12_bot');
    script.setAttribute('data-size', 'small');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');
    script.setAttribute('data-request-access', 'write');
    document.getElementById('telegram-login-container')!.appendChild(script);
  }, []);

  // Define the callback function
  const onTelegramAuth = (user:any) => {
    alert(
      `Logged in as ${user.first_name} ${user.last_name} (${user.id}${user.username ? `, @${user.username}` : ''})`
    );
  };

  // Expose the callback function to the global window object
  useEffect(() => {
    window.onTelegramAuth = onTelegramAuth;
  }, []);

  return <div id="telegram-login-container">Login</div>;
};

export default TelegramLoginButton;

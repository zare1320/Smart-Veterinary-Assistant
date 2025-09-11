import React from 'react';
import { Button } from './Button';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  message: string;
  action?: {
    text: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, message, action }) => {
  return (
    <div className="text-center py-16 px-4">
      <div className="mx-auto w-20 h-20 flex items-center justify-center rounded-full bg-muted text-muted-foreground/50">
        {icon}
      </div>
      <h2 className="mt-4 text-xl font-bold text-heading">{title}</h2>
      <p className="mt-2 text-muted-foreground">{message}</p>
      {action && (
        <Button onClick={action.onClick} variant="primary" className="mt-6">
          {action.icon} {action.text}
        </Button>
      )}
    </div>
  );
};

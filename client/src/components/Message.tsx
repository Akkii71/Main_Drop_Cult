import { ReactNode } from 'react';

const Message = ({ variant = 'info', children }: { variant?: 'info' | 'danger' | 'success' | 'warning', children: ReactNode }) => {
    const colors = {
        info: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
        danger: 'bg-red-500/10 text-red-500 border-red-500/20',
        success: 'bg-green-500/10 text-green-500 border-green-500/20',
        warning: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    };

    return (
        <div className={`p-4 mb-4 text-sm font-mono border ${colors[variant]} rounded`}>
            {children}
        </div>
    );
};

export default Message;

import React from 'react';

interface TripLayoutProps {
    children: React.ReactNode;
}

const TripLayout: React.FC<TripLayoutProps> = ({ children }) => {
    return (
        <div className="max-w-7xl mx-auto mt-28 px-4 sm:px-6 lg:px-8">
            {children}
        </div>
    );
};

export default TripLayout;
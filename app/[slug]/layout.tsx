import React from 'react';

interface CompanyLayoutProps {
    children: React.ReactNode;
}

const CompanyLayout: React.FC<CompanyLayoutProps> = ({ children }) => {
    return (
        <div className="max-w-7xl mx-auto mt-28 px-4 sm:px-6 lg:px-8">
            {children}
        </div>
    );
};

export default CompanyLayout;
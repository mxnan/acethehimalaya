import React from 'react';

interface CompanyLayoutProps {
    children: React.ReactNode;
}

const CompanyLayout: React.FC<CompanyLayoutProps> = ({ children }) => {
    return (
        <div className="max-w-7xl mx-auto mt-28 lg:mt-32 px-4 sm:px-6">
            {children}
        </div>
    );
};

export default CompanyLayout;
import React, { useState } from 'react';

export function EmailFilter({ onFilterChange, selectedEmailsCount }) {
    const [filterBy, setFilterBy] = useState({ txt: '' });

    function handleChange({ target }) {
        const value = target.value;
        const updatedFilter = { ...filterBy, txt: value };

        setFilterBy(updatedFilter);
        onFilterChange(updatedFilter); // Trigger filtering on every input change
    }

    return (
        <form className="email-filter" onSubmit={(e) => e.preventDefault()}>
            <input
                type="text"
                name="txt"
                placeholder="Search emails"
                value={filterBy.txt}
                onChange={handleChange}
            />
            {selectedEmailsCount > 0 && (
                <span 
                    className="selected-rows-message" 
                    style={{ marginLeft: '20px' }}  // Adding extra margin here
                >
                    {`Selected ${selectedEmailsCount} rows`}
                </span>
            )}
        </form>
    );
    
}

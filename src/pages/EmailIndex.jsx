import React, { useState, useEffect } from 'react';
import { EmailFilter } from '../cmps/EmailFilter';
import { EmailList } from './EmailList';
import { EmailFolderList } from '../cmps/EmailFolderList';
import { emailService } from '../services/email.service.js';
import { useNavigate } from 'react-router-dom';

export function EmailIndex() {
    const [filterBy, setFilterBy] = useState({
        status: 'inbox',
        txt: '',
        isRead: null,
    });

    const [emails, setEmails] = useState([]);
    const [selectedEmails, setSelectedEmails] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        loadEmails();
    }, [filterBy]);

    function loadEmails() {
        emailService.query(filterBy).then(setEmails).catch(err => {
            console.error('Failed to load emails:', err);
        });
        setSelectedEmails([]); // Clear selected emails when the filter changes
        setSelectAll(false); // Uncheck "Select All" checkbox when switching folders
    }

    function handleFilterChange(newFilterBy) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...newFilterBy }));
    }

    function handleFolderSelect(folderId) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, status: folderId }));
    }

    function handleSelectAll(isChecked) {
        setSelectAll(isChecked);
        if (isChecked) {
            setSelectedEmails(emails.map(email => email.id)); // Select all emails in the current list
        } else {
            setSelectedEmails([]); // Deselect all emails
        }
    }

    function handleSelectEmail(emailId) {
        setSelectedEmails(prevSelected => {
            const updatedSelected = prevSelected.includes(emailId)
                ? prevSelected.filter(id => id !== emailId) // Deselect email
                : [...prevSelected, emailId]; // Select email

            setSelectAll(updatedSelected.length === emails.length); // Update "Select All" checkbox based on selection
            return updatedSelected;
        });
    }

    function handleToggleStar(emailId) {
        setEmails(prevEmails => {
            const updatedEmails = prevEmails.map(email => {
                if (email.id === emailId) {
                    return { ...email, isStarred: !email.isStarred };
                }
                return email;
            });

            // Save the updated emails back to storage
            updatedEmails.forEach(email => emailService.save(email));

            // If in the "starred" folder, filter out unstarred emails immediately
            if (filterBy.status === 'starred') {
                return updatedEmails.filter(email => email.isStarred);
            }
            
            return updatedEmails;
        });
    }

    function handleDeleteEmail(emailId) {
        emailService.remove(emailId).then(() => {
            setEmails(prevEmails => prevEmails.filter(email => email.id !== emailId));
            setSelectedEmails(prevSelected => prevSelected.filter(id => id !== emailId));
        });
    }

    function handleReply(emailId) {
        navigate(`/email/${emailId}/reply`);
    }

    return (
        <section className="email-index">
            <EmailFolderList
                onFolderSelect={handleFolderSelect}
                selectedFolder={filterBy.status}
            />
            <div className="email-content">
                <EmailFilter
                    onFilterChange={handleFilterChange}
                    selectedEmailsCount={selectedEmails.length} // Pass the selected email count
                />
                <EmailList
                    emails={emails}
                    onSelectEmail={handleSelectEmail}
                    selectedEmails={selectedEmails}
                    onToggleStar={handleToggleStar}  // Pass the handleToggleStar function to EmailList
                    onDeleteEmail={handleDeleteEmail}
                    onReply={handleReply}
                    onSelectAll={handleSelectAll}
                />
            </div>
        </section>
    );
}

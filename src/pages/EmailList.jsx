import React from 'react';
import { useNavigate } from 'react-router-dom';

export function EmailList({ emails, onSelectEmail, selectedEmails, onToggleStar, onDeleteEmail, onReply, onSelectAll }) {
    const navigate = useNavigate();

    function handleRowClick(emailId) {
        navigate(`/email/${emailId}`);
    }

    return (
        <table className="email-table">
            <thead>
                <tr>
                    <th>
                        <div className="select-all-dropdown">
                            <input
                                type="checkbox"
                                checked={selectedEmails.length === emails.length && emails.length > 0}
                                onChange={(e) => onSelectAll(e.target.checked)}
                            />
                        </div>
                    </th>
                    <th>From</th>
                    <th>Title</th>
                    <th>Actions</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {emails.map(email => (
                    <tr 
                        key={email.id} 
                        onClick={(e) => {
                            if (!e.target.closest('.email-checkbox') && !e.target.closest('.star-icon') && !e.target.closest('.email-actions')) {
                                handleRowClick(email.id);
                            }
                        }} 
                        className="email-item"
                    >
                        <td>
                            <input
                                type="checkbox"
                                className="email-checkbox"
                                checked={selectedEmails.includes(email.id)}
                                onChange={(e) => {
                                    e.stopPropagation();  // Prevent row click when interacting with checkbox
                                    onSelectEmail(email.id);
                                }}
                            />
                            <span
                                className={`star-icon ${email.isStarred ? 'filled' : 'empty'}`}
                                onClick={(e) => {
                                    e.stopPropagation();  // Prevent row click when interacting with star
                                    onToggleStar(email.id);
                                }}
                            >
                                ★
                            </span>
                        </td>
                        <td>{email.from}</td>
                        <td>{email.subject}</td>
                        <td className="email-actions">
                            <i className="fas fa-reply" onClick={(e) => { 
                                e.stopPropagation();  // Prevent row click when interacting with reply
                                onReply(email.id); 
                            }}></i>
                            <i className="fas fa-trash" onClick={(e) => {
                                e.stopPropagation();  // Prevent row click when interacting with delete
                                onDeleteEmail(email.id); 
                            }}></i>
                        </td>
                        <td>{new Date(email.sentAt).toLocaleDateString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

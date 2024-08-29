import React from 'react';
import { useNavigate } from 'react-router-dom';

export function EmailPreview({ email, onToggleStar, onDeleteEmail, onReply, onSelectEmail, isSelected }) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/email/${email.id}`);
    }

    return (
        <li className="email-item" onClick={handleClick}>
            <input
                type="checkbox"
                checked={isSelected}
                onClick={(e) => { e.stopPropagation(); onSelectEmail(email.id); }}
            />
            <i className={`fas fa-star ${email.isStarred ? 'starred' : ''}`} onClick={(e) => { e.stopPropagation(); onToggleStar(email.id); }}></i>
            <div className="email-details">
                <span className="email-subject">{email.subject}</span>
                <span className="email-body">{email.body}</span>
            </div>
            <span className="email-date">
                {new Date(email.sentAt).toLocaleString()}
            </span>
            <div className="email-actions">
                <i className="fas fa-reply" onClick={(e) => { e.stopPropagation(); onReply(email.id); }}></i>
                <i className="fas fa-trash" onClick={(e) => { e.stopPropagation(); onDeleteEmail(email.id); }}></i>
            </div>
        </li>
    );
}

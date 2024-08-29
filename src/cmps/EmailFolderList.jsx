import React from 'react';
import '../assets/css/cmps/EmailFolderList.css';

export function EmailFolderList({ onFolderSelect, selectedFolder }) {
    const folders = [
        { id: 'inbox', name: 'Inbox', icon: 'fas fa-inbox' },
        { id: 'sent', name: 'Sent', icon: 'fas fa-paper-plane' },
        { id: 'starred', name: 'Starred', icon: 'fas fa-star' },
        { id: 'trash', name: 'Trash', icon: 'fas fa-trash' },
    ];

    return (
        <nav className="email-folder-list">
            <ul>
                {folders.map(folder => (
                    <li key={folder.id}>
                        <button
                            className={`folder-btn ${selectedFolder === folder.id ? 'active' : ''}`}
                            onClick={() => onFolderSelect(folder.id)}
                        >
                            <i className={folder.icon}></i>
                            <span>{folder.name}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

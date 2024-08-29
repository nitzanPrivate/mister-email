import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { emailService } from '../services/email.service.js';

export function EmailDetails() {
    const { mailId } = useParams();
    const navigate = useNavigate();
    const [email, setEmail] = useState(null);

    useEffect(() => {
        loadEmail();
    }, [mailId]);

    function loadEmail() {
        emailService.getById(mailId).then(setEmail).catch(() => {
            navigate('/emails'); // Navigate back if email not found
        });
    }

    function onDeleteEmail() {
        emailService.remove(mailId).then(() => {
            navigate('/emails'); // Navigate back to the email list after deletion
        });
    }

    if (!email) return <div>Loading...</div>;

    return (
        <section className="email-details">
            <h2>{email.subject}</h2>
            <p><strong>From:</strong> {email.from}</p>
            <p><strong>To:</strong> {email.to}</p>
            <p><strong>Sent At:</strong> {new Date(email.sentAt).toLocaleString()}</p>
            <hr />
            <p>{email.body}</p>
            <div className="email-actions">
                <button onClick={onDeleteEmail}>Delete</button>
                <button onClick={() => navigate('/emails')}>Back to List</button>
            </div>
        </section>
    );
}

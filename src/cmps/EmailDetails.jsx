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
            navigate('/emails');
        });
    }

    function onDeleteEmail() {
        const res = confirm("Do you really want to delete this email?");

        if (res) {

            emailService.remove(mailId).then(() => {
                navigate('/emails');
            });
        }
    }

    if (!email) return <div>Loading...</div>;

    return (
        <section className="email-details">
            <h2>{email.subject}</h2>
            <p className="from">From: {email.from}</p>
            <p>To: {email.to}</p>
            <p>Sent At: {new Date(email.sentAt).toLocaleString()}</p>
            <hr />
            <p>{email.body}</p>
            <div className="email-actions">
                <button onClick={onDeleteEmail}>Delete</button>
                <button onClick={() => navigate('/emails')}>Back to List</button>
            </div>
        </section>
    );
}

import { useEffect, useState } from 'react'
import { emailService } from '../services/email.service.js'

export function Inbox() {
    const [emails, setEmails] = useState([])

    useEffect(() => {
        loadEmails()
    }, [])

    function loadEmails() {
        const filterBy = { status: 'inbox' }
        emailService.query(filterBy).then(setEmails)
    }

    return (
        <section className="inbox">
            <h1>Inbox</h1>
            <img src= "./src/assets/imgs/inbox.png" alt="" />
            <ul>
                {emails.map(email => (
                    <li key={email.id}>
                        <h3>{email.subject}</h3>
                        <p>{email.body}</p>
                    </li>
                ))}
            </ul>
        </section>
    )
}

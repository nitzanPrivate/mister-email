import { useEffect, useState } from 'react'
import { emailService } from '../services/email.service.js'

export function Sent() {
    const [emails, setEmails] = useState([])

    useEffect(() => {
        loadEmails()
    }, [])

    function loadEmails() {
        const filterBy = { status: 'sent' }
        emailService.query(filterBy).then(setEmails)
    }

    return (
        <section className="sent">
            <h1>Sent Emails</h1>
            <img src= "./src/assets/imgs/sent.png" alt="" />
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

import imgUrl from '../assets/imgs/react.png'
import { Inbox } from './Inbox'
import { Sent } from './Sent'

export function Home() {
    return (
        <section className="home">
            <img src= "./src/assets/imgs/email_app.png" alt="" />
            <h1 className="tomato-red">Welcome to React Email App</h1>
            <p>Your go-to solution for managing emails efficiently and effectively.</p>
        </section>
    )
}
import React from 'react';
import nitzanPhoto from '../assets/imgs/me.png'; 
import dogPhoto from '../assets/imgs/joy.png'; 

export function AboutUs() {
    return (
        <section className="about-us">
            <h1>About Us</h1>
            <p>
                Welcome to MisterEmail! This is a clone of Gmail for homework assigment 
            </p>
            <p>
                Our mission is to make email management simple, intuitive, and efficient. With MisterEmail, you can stay organized, keep track of your important communications, and never miss a beat.
            </p>
            <p>
                We are constantly improving and adding new features to help you manage your emails more effectively. If you have any suggestions or feedback, we'd love to hear from you!
            </p>
            <h2>Our Team</h2>
           
            <div className="team-container">
                <div className="team-member">
                    <h3>Nitzan Paz</h3>
                    <img src={nitzanPhoto} alt="Nitzan Paz" className="team-photo" />
                </div>
                <div className="team-member">
                    <h3>Joy</h3>
                    <img src={dogPhoto} alt="Joy the Dog" className="team-photo" />
                </div>
            </div>
           
        </section>
    );
}

import React, { useState } from 'react';

const FeedbackForm = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [subject, setSubject] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    const handleTextChange = (e) => {
        setText(e.target.value);
    };
    const handleSubjectChange = (e) => {
        setSubject(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Валідація емейлу за допомогою патерна
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            console.log('Некоректний емейл');
            return;
        }

        // Логіка для виведення інформації в консоль після відправлення форми
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Subject:', subject);
        console.log('FeedbackText:', text);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="name" value={name} onChange={handleNameChange} />
            </label>
            <br />
            <label>
                Email:
                <input type="email" value={email} onChange={handleEmailChange} required />
            </label>
            <br />
            <label>
                Тема:
                <input type="subject" value={subject} onChange={handleSubjectChange} required />
            </label>
            <br />
            <label>
                Feedback Text:
                <textarea
                    id="message"
                    name="message"
                    value={text}
                    onChange={handleTextChange}
                />
            </label>
            <button type="submit">Відправити</button>
        </form>
    );
};

export default FeedbackForm;

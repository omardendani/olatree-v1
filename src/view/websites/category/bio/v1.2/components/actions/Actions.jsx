export default function WhatsAppAction({ phone, message, button }) {
    const defaultMessage = 'Hi, this is a default whatsapp message from OlaTree';
    const wtspMsg = message || defaultMessage;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(wtspMsg)}`;

    return (
        <a href={url} target="_blank" rel="noopener noreferrer">
            {button}
        </a>
    );
}
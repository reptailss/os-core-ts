export function formatLogMessages(log: string): string {
    const infoRegex = /^info: (\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) (.+)/;
    const errorRegex = /^error: (\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) (.+)/;
    const stackRegex = /at .+/; // Регулярний вираз для знаходження стеку помилки

    // Обробка info логів
    if (infoRegex.test(log)) {
        const [, date, message] = log.match(infoRegex)!;
        return `<span class="info"><span class="date">${date}</span> ${message}</span>`;
    }

    // Обробка error логів
    if (errorRegex.test(log)) {
        const [, date, message] = log.match(errorRegex)!;
        let formattedMessage = `<span class="error"><span class="date">${date}</span> ${message}</span>`;

        // Якщо є стек помилки, додаємо його
        if (stackRegex.test(message)) {
            formattedMessage += `<pre class="stack">${message.split('\n').map(line => `<span class="stack-line">${line}</span>`).join('\n')}</pre>`;
        }

        return formattedMessage;
    }

    return log;
}

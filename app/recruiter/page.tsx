const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!userInput.trim()) return;
  const newMessages = [
    ...messages,
    { id: Date.now().toString(), role: 'user', content: userInput.trim() }
  ];

  try {
    const res = await fetch('/api/recruiter-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages })
    });
    const data = await res.json();
    if (data.message) {
      newMessages.push(data.message);
    }
  } catch (err) {
    console.error('Error calling recruiter chat API', err);
  }

  setMessages(newMessages);
  setUserInput('');
}; 
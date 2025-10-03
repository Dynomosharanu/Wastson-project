document.getElementById('tts-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const textToSpeak = document.getElementById('textInput').value;
    const audioEl = document.getElementById('speechAudio');
    
    // --- THIS IS THE CRITICAL LOGIC ---
    
    // 1. Send the text securely to your backend server (e.g., /api/synthesize-speech)
    // 2. The backend server uses the SECURE Watson TTS API key to send the text to IBM Cloud.
    // 3. The backend receives the audio stream (e.g., MP3 or Ogg) from IBM Cloud.
    // 4. The backend sends the audio data back to this frontend.

    try {
        // Fetch the audio stream directly from your backend endpoint
        const response = await fetch('https://api.au-syd.text-to-speech.watson.cloud.ibm.com/instances/6336974e-321d-4303-a7c0-e3cf39c6b643', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // You can also specify the voice and audio format here
            body: JSON.stringify({ text: textToSpeak, format: 'audio/mpeg' }) 
        });

        if (response.ok) {
            // Get the audio response as a Blob
            const audioBlob = await response.blob(); 
            // Create a local URL for the Blob
            const audioUrl = URL.createObjectURL(audioBlob); 
            
            // Set the audio element source and make it visible
            audioEl.src = audioUrl;
            audioEl.hidden = false;
            audioEl.play();

        } else {
            console.error('TTS Error:', response.statusText);
            audioEl.hidden = true;
            alert('Speech generation failed.');
        }
    } catch (error) {
        console.error('TTS Request failed:', error);
        alert('Text-to-Speech service unavailable.');
    }
});
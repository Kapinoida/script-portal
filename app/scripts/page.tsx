

'use client';

import ScriptSelect from '@/components/script-select';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function Scripts() {
    const [result, setResult] = useState('');
    const [selectedScriptPath, setSelectedScriptPath] = useState<string | undefined>(undefined); 

    const handleScriptSelect = (scriptPath: string) => {
        console.log('Selected script:', scriptPath);
        setSelectedScriptPath(scriptPath);
    };

    const handleSubmit = async () => {
        if (!selectedScriptPath) {
            // Handle case where no script is selected
            setResult('Please select a script first.');
            return;
        }

        const userInput = 'userInput'; // Or get it from your UI

        try {
            const response = await fetch('/api/run-script', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ scriptName: selectedScriptPath, userInput }),
            });

            if (response.ok) {
                const reader = response.body?.getReader();
                const decoder = new TextDecoder();
        
                setResult(''); // Clear the previous result
                let accumulatedResult = '';
        
                while (true) {
                    const { done, value } = await reader!.read();
                    if (done) break;
        
                    const chunk = decoder.decode(value);
                    accumulatedResult += chunk;
        
                    setResult(accumulatedResult); // Update the result with the latest chunk
                }
            } else {
                const data = await response.json();
                setResult(data.error);
            }

        } catch (error) {
            console.error(error);
            setResult('Network error');
        }
    };

    return (
        <div>
        <h1>Scripts</h1>
        <ScriptSelect onScriptSelect={handleScriptSelect} />
        <Button onClick={handleSubmit} disabled={!selectedScriptPath}>Run Script</Button>
        <div>
            {result.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
            ))}
        </div>
        </div>
    );
}
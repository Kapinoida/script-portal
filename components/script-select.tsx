

import { useEffect, useState } from 'react';
import { Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue, 
} from './ui/select';

interface Script {
    id: number;
    script_name: string;
    script_path: string;
    description: string;
}

interface ScriptSelectProps {
    onScriptSelect: (scriptPath: string) => void; 
}

export default function ScriptSelect({ onScriptSelect }: ScriptSelectProps) {
    const [scripts, setScripts] = useState<Script[]>([]);
    const [selectedScriptPath, setSelectedScriptPath] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/fetch-data');
                const data = await response.json();

                if (response.ok) {
                    setScripts(data);
                } else {
                    console.error('Error fetching data:', data.error);
                }
            } catch (error) {
                console.error('Error during fetch:', error);
            }
        };

        fetchData();
    }, []);

    const handleSelectChange = (value: string) => {
        setSelectedScriptPath(value); 
        onScriptSelect(value); 
    };

    return (
        <div>
            <Select onValueChange={handleSelectChange} value={selectedScriptPath}>
                <SelectTrigger>
                    <SelectValue placeholder="Select a script" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Scripts</SelectLabel>
                        {scripts.map((script) => (
                            <SelectItem key={script.id} value={script.script_path}>
                                {script.script_name} - {script.description}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
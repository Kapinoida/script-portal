

import { useEffect, useState } from 'react';
import { Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue, 
} from './ui/select';
import { Skeleton } from './ui/skeleton';

interface Script {
    script_id: number;
    script_name: string;
    script_path: string;
    description: string;
}

interface ScriptSelectProps {
    onScriptSelect: (scriptPath: string, key: number) => void; 
}

export default function ScriptSelect({ onScriptSelect }: ScriptSelectProps) {
    const [scripts, setScripts] = useState<Script[]>([]);
    const [selectedScriptPath, setSelectedScriptPath] = useState<string | undefined>(undefined);
    const [selectedScriptId, setSelectedScriptId] = useState<number | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                const response = await fetch('/api/fetch-scripts');
                const data = await response.json();

                if (response.ok) {
                    if (isMounted) {
                        setScripts(data);
                    }
                } else {
                    console.error('Error fetching data:', data.error);
                }
            } catch (error) {
                console.error('Error during fetch:', error);
            }
        };

        fetchData();
        setIsLoading(false);

        return () => {
            isMounted = false;
        };
    }, []);

    const handleSelectChange = (value: string) => {
        setSelectedScriptPath(value); 
        const key = scripts.find((script) => script.script_path === value)?.script_id;
        if (key !== undefined) {
            setSelectedScriptId(key);
            onScriptSelect(value, key); 
        }
    };

    return (
        <div className='min-w-full h-[40px] rounded-full '>
            {isLoading ? <Skeleton className="min-w-full min-h-full rounded-xl" /> : (
                <Select onValueChange={handleSelectChange} value={selectedScriptPath} key={selectedScriptId}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a script" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Scripts</SelectLabel>
                            {scripts.map((script) => (
                                <SelectItem key={script.script_id} value={script.script_path}>
                                    {script.script_name} - {script.description}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            )}
        </div>
    );
}
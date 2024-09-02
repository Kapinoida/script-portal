'use client';

import { useState, useEffect } from 'react';

export default function Logs() {
    const [scripts, setScripts] = useState<{ id: number, script_name: string }[]>([]);

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
  
    return (
      <div>
        {/* ... */}
        {scripts.map((script) => (
          <div key={script.id}>
            <h2>{script.script_name}</h2>
            {/* ... display script details */}
          </div>
        ))}
      </div>
    );
}
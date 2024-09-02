'use server';

// import { query } from '@/lib/db';

import Docker from 'dockerode';
const docker = new Docker();

// Function to remove control characters
function cleanOutput(output) {
    // Remove control characters using a regex
    output = output.replace(/[^\x20-\x7E\n]/g, '');
    if (output.startsWith('!')) {
        output = output.substring(1);
    }
    return output;
}

export async function POST(req) {
  const { scriptName, userInput } = await req.json();

  try {
    // await query('INSERT INTO logs (script_id, log_level, message) VALUES (?, ?, ?)', [
    //     scriptId, 
    //     'INFO',
    //     'Script execution started',
    //   ]);
    // 1. Create and Run the Container
    const container = await docker.createContainer({
      Image: 'python:3.10-slim-buster', // Or your preferred Python image
      Cmd: ['python3', '-u', `/app/${scriptName}`, userInput], 
      HostConfig: {
        Binds: [`${process.cwd()}:/app`], // Mount your project directory
        AutoRemove: true, // Automatically remove the container after it exits
      },
      AttachStdout: true,
      AttachStderr: true,
    });

    await container.start();

    // 2. Stream Output to Client
    const streamLogs = new ReadableStream({
      async start(controller) {
        container.logs({
          follow: true,
          stdout: true,
          stderr: true
        }, (err, stream) => {
          if (err) {
            controller.error(err);
            return;
          }

          stream.on('data', (chunk) => {
            const cleanChunk = cleanOutput(chunk.toString());
            controller.enqueue(cleanChunk); // Stream each chunk of output
          });

          stream.on('end', () => {
            controller.close(); // Close the stream when logs are finished
          });

          stream.on('error', (err) => {
            controller.error(err); // Handle any errors in the stream
          });
        });
      }
    });

    return new Response(streamLogs, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain'
      }
    });

  } catch (error) {
    // await query('INSERT INTO logs (script_id, log_level, message) VALUES (?, ?, ?)', [
    //     scriptId, 
    //     'ERROR',
    //     error.message,
    // ]);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

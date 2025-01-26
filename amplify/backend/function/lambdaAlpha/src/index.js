const AWS = require('aws-sdk');
const bedrockAgent = new AWS.BedrockAgentRuntime();

exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    
    // Get headers from the event
    const headers = event.headers || {};
    const agentDetails = JSON.parse(headers.header1 || '{}');
    const prompt = headers.header2;
    const s3Details = JSON.parse(headers.header3 || '{}');
    
    // Check if all headers are provided
    if (!agentDetails.agentId || !agentDetails.agentAliasId || !prompt || !s3Details.s3Url || !s3Details.fileKey) {
        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Headers": "*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ error: 'Missing agent details, prompt, or S3 file URL' }),
        };
    }

    // Define your agent invocation request
    const params = {
        agentId: agentDetails.agentId,          // Agent ID from header1
        agentAliasId: agentDetails.agentAliasId, // Agent alias ID from header1
        sessionId: agentDetails.sessionId, // Session ID from header1
        inputText: prompt, // Prompt from header2
        inputUrl: s3Details.s3Url, // S3 URL from header3
        fileKey: s3Details.fileKey // File Key from header3
    };

    try {
        // Create the InvokeAgentCommand with the parameters
        const command = new AWS.BedrockAgentCommand(params);
        
        // Send the command to invoke the agent
        const response = await bedrockAgent.send(command);
        
        // Return the successful response
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers": "*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(response),
        };
    } catch (error) {
        // Handle any errors during invocation
        console.error('Error invoking agent:', error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Headers": "*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ error: error.message }),
        };
    }
};

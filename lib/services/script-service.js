JUDGING_GUIDE = `
    Once award winners have been identified, the judges are responsible for writing awards scripts. There is a
    format to the awards scripts that we like to use. A good award script is usually three sentences. The structure
    of the sentences is important.
    1. Sentence one could apply to many teams but has a subtle hint.
    2. Sentence two has a hint in which the winning team might understand.
    3. Sentence three has a bigger hint, leaving the team somewhat sure who it is, but is not 100% positive.
    4. The last sentence is: “And the award goes to…”
    Example: Team 3344 is called the Robo-Knights, from Carnation, WA. They are winners of the Design Award.
    Their team colors are blue, they have a robot with an impressive arm design, and the robot has a shiny blue
    finish. The award script might say:
    “This VALIANT effort required many nights designing a robot with an impressive array of features. A strong
    arm and a solid design have their opponents turning BLUE with envy. A SHINING example worthy of a knight
    at the round table of Camelot, the Design Award goes to team 3344 the Robo-Knights from Carnation, WA.”
    Key points about award scripts:
    ● Judges should write them. They have the notes and details needed.
    ● Always read them aloud when making final edits. They often read and speak differently.
    ● Make reading the script easy for the emcee. Avoid long sentences and long words. Someone else
    needs to read your script.
    ● Capitalize or bold words that the emcee should emphasize when reading the script.
    ● Do not reveal the winner in the first sentence. “We think team 1234 deserves the Design Award
    because…” is a common submission from the judges. Ask them to rewrite it to reveal the result only at
    the end.
    ● Try to reveal the key reasons the team has received the award.
    Keep in mind that scripts are only needed for the winners of the award. The judges do not need to write scripts
    for the finalists.
`

async function callOpenAIGPT3(messages) {
    const apiKey = process.env.OPENAI_API_KEY; // Replace with your actual API key
    const endpoint = 'https://api.openai.com/v1/chat/completions';

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    };

    const body = JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
    });

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: headers,
            body: body
        });

        const {
            choices: [{
                message: {
                    content
                }
            }]
        } = await response.json();
        return content;
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        throw error;
    }
}

class ScriptService {

    async generateScript({
        teamNumber,
        teamName,
        notes,
        awards,
    }) {

        const response = await callOpenAIGPT3([
            {
                role: 'system', content: [
                    'You are a judge at a FIRST Tech Challenge competition. You are creating awards scripts for the competition.',
                    'The user will provide you with the team number, team name, notes, and awards.',
                    'Using the information provided below as a guide, you will create a script for the awards ceremony.',
                    JUDGING_GUIDE
                ].join('\n')
            },
            {
                role: 'user', content: [
                    'Write a script for the awards ceremony using the following information',
                    `Team Number: ${teamNumber}`,
                    `Team Name: ${teamName}`,
                    `Notes: ${notes}`,
                    `Award: ${awards}`,
                ].join('\n')
            },
        ])
        return {
            response
        }
    }

}

module.exports = ScriptService

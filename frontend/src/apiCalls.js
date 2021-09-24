export const getMatches = async () => {
    try {
        const response = await fetch("http://localhost:3000/matches");
        const matches = await response.json();

        return matches;
    } catch (err) {
        console.error(err);
    }
}
export const fetchData = async (url: string, callback: Function) => {
    try {
        const response = await fetch(url);
        const json = await response.json();
        callback(json);
    } catch (error) {
        console.log('Error fetching data:', error);
    }
};
export const fetchData = async (url: string, callback: Function, processor: Function | null) => {
    try {
        const response = await fetch(url);
        const json = await response.json();
        // console.log(processor)
        if (processor == null) {
            callback(json)
        } else {
            callback(processor(json));
        }
    } catch (error) {
        console.log('Error fetching data:', error);
    }
};

export const result = async (url: string) => {
    try {
        const response = await fetch(url, { method: 'get' });
        const data = await response.json();
        const rocketId = data.rocket;

        console.log(rocketId, '\n');
        const response_1 = await fetch(`${url}/rockets/${rocketId}`);
        return await response_1.json();
    } catch (err) {
        console.error('Request failed', err);
    }
}
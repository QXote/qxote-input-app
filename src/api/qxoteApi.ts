export default class qxoteApi {

    async getPlants(): Promise<any> {
        const url = "https://192.168.1.140:7031/api/Plant";
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();;
        } catch (error: any) {
            console.error("Fetch error:", error.message);
            return null;
        }
    }

    getPlots(): void {
        this.getPlants().then(data => {
            const plotNumbers = [...new Set(data.map((element: any) => element.plotNr))];
            console.log(plotNumbers); // Unique plot numbers
        });
    }
}
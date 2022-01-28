const apiHost = 'https://bakesaleforgood.com';

export default {
    async fetchDealsList() {
        try {
            const response = await fetch(apiHost + '/api/deals');
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.log(error);
        }
    },
    async fetchDealDetails(dealId) {
        try {
            const response = await fetch(apiHost + `/api/deals/${dealId}`);
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.log(error);
        }
    },
    async fetchDealsSearchResults(searchTerm) {
        try {
            const response = await fetch(apiHost + `/api/deals?searchTerm=${searchTerm}`);
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.log(error);
        }
    }
};
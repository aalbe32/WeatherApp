

interface Data {
    
}


function getData(): Promise<Data[]> {
    return fetch("https://sws-data.sws.bom.gov.au/api/v1/get-k-index")
        .then(res => {
            if (!res.ok) throw new Error("failed to fetch Data");
            return res.json();
        })
        .then(data => data as Data[]);

}
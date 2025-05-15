import { api } from "encore.dev/api";
import { secret } from "encore.dev/config";

type StatusRequest = {
    id: string;
}

type StatusResponse = {
    status: "pending" | "generating" | "success";
    url: string | null;
}

const pdfMonkeyApiKey = secret("PdfMonkeyApiKey");

export const status = api(
    { expose: true, method: "POST" },
    async(payload: StatusRequest): Promise<StatusResponse> => {
        const response = await fetch(`https://api.pdfmonkey.io/api/v1/documents/${payload.id}`, {
            headers: {
                Authorization: `Bearer ${pdfMonkeyApiKey()}`,
            },
        });

        const data = await response.json() as PdfMonkey.DocumentStatusResponse;

        const {
            document: {
                status,
                download_url,
            },
        } = data;

        return {
            status,
            url: download_url,
        };
    },
);


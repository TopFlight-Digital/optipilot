import { api } from "encore.dev/api";
import { secret } from "encore.dev/config";

type GenerateRequest = {
    title: string;
    description: string;
}

type GenerateResponse = {
    id: string;
}

const pdfMonkeyApiKey = secret("PdfMonkeyApiKey");
const downloadableTemplateId = secret("DownloadableTemplateId");

export const generate = api(
    { expose: true, method: "POST" },
    async(payload: GenerateRequest): Promise<GenerateResponse> => {
        const body = {
            document: {
                document_template_id: downloadableTemplateId(),
                status: "pending",
                payload,
            },
        };

        const response = await fetch("https://api.pdfmonkey.io/api/v1/documents", {
            body: JSON.stringify(body),
            headers: {
                Authorization: `Bearer ${pdfMonkeyApiKey()}`,
                "Content-Type": "application/json",
            },
            method: "POST",
        });

        const data = await response.json() as PdfMonkey.GenerateDocumentResponse;
        const id = data.document.id;

        return { id };
    },
);


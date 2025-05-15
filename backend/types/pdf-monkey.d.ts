namespace PdfMonkey {
    export type GenerateDocumentResponse = {
        document: Document;
    }

    export type Document = {
        id: string;
        document_template_id: string;
        status: "pending" | "generating";
        failure_cause: string | null;
        filename: string;
        download_url: string | null;
        preview_url: string;
        public_share_link: string | null;
        payload: Record<string, any>;
        meta: Record<string, any>;
        created_at: string; // ISO 8601 timestamp
        updated_at: string; // ISO 8601 timestamp
    }

    export type DocumentStatusResponse = {
        document: DocumentStatus;
    }

    export type DocumentStatus = {
        id: string;
        app_id: string;
        created_at: string; // ISO 8601 timestamp
        document_template_id: string;
        meta: Record<string, any> | null;
        output_type: string;
        status: "pending" | "generating" | "success";
        updated_at: string; // ISO 8601 timestamp
        xml_data: string | null;
        payload: string;
        download_url: string | null;
        checksum: string;
        failure_cause: string | null;
        filename: string | null;
        generation_logs: any[];
        preview_url: string;
        public_share_link: string | null;
    }
}

export interface CloudflareBindings {
  WORKERTEST: DurableObjectNamespace;
  // Add any other bindings you need here
}

export interface Message {
  content: string;
  audioFileLink?: string;
  videoFileLink?: string;
  imageFileLink?: string;
  documentFileLink?: string;
  sender: string;
  timestamp: string;
}

export interface WebhookPayload {
  content: string;
  audioFileLink?: string;
  videoFileLink?: string;
  imageFileLink?: string;
  documentFileLink?: string;
  sender: string;
}

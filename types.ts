export interface Puter {
    index:               number;
    message:             Message;
    logprobs:            null;
    finish_reason:       string;
    usage:               Usage[];
    via_ai_chat_service: boolean;
}

export interface Message {
    role:    string;
    content: string;
    refusal: null;
}

export interface Usage {
    type:   string;
    model:  string;
    amount: number;
    cost:   number;
}
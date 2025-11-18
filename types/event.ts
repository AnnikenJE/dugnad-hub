// Events (dugnad) interface
export interface EventData{
    id: string
    title: string
    imageUri: string
    description: string
    tasks: string
    category: string
    date: string
    time: string
    maxParticipants: number
    participants: string[];
}
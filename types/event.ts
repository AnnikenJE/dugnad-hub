// Events (dugnad) interface
export interface EventData{
    id: string
    authorId: string
    authorName: string
    title: string
    imageUri: string
    description: string
    adress: string
    tasks: string
    category: string
    date: string
    time: string
    maxParticipants: number
    participants: string[];
}
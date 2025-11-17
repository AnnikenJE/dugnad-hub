import { EventData } from "@/types/event"
import { Pressable, Text, View } from "react-native"


export type EventProps = {
    eventData: EventData
}

export default function Event({ eventData }: EventProps){
    return(
        <Pressable>
            <View>
                <Text>
                    {eventData.title}
                </Text>
            </View>
        </Pressable>
    )
}
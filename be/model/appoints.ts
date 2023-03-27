import mongoose from "mongoose";
import { Schema , InferSchemaType} from "mongoose";

const appMentSchema = new Schema({
    uID: String,
    startDate: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    comment: String

})

export type AppMentType = InferSchemaType<typeof appMentSchema>
export const AppMent = mongoose.model('AppMent', appMentSchema)
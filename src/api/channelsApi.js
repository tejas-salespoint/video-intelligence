import axios from "axios";

const channelsApi = axios.create({
    baseURL : "http://localhost:1337/api"
})



export const getChannels = async () => {
    const response = await channelsApi.get("/channels")
    return response.data
}

export const addChannels = async (channel) => {
    return await channelsApi.post("/channels",channel)
}

export const updateChannels = async (channel) => {
    return await channelsApi.patch(`/channels/${channel.id}`,channel)
}

export const deleteChannels = async ({id}) => {
    return await channelsApi.post(`/channels/${id}`,id)
}

export default channelsApi